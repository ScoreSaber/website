'use client';

import { useState, type CSSProperties } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FaUserCheck, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { useAuth } from '@/modules/auth';
import { followPlayer, unfollowPlayer } from '@/modules/player/actions/user/member';
import { cn } from '@/shared/format/helpers';

type FollowState = 'none' | 'follower' | 'following' | 'mutual';
interface ResolvedFollowState {
   state: FollowState;
   platformFriend: boolean;
}

interface PlayerFollowButtonProps {
   playerId: string;
   compact?: boolean;
   followsViewer?: boolean;
}

export function PlayerFollowButton({ playerId, compact, followsViewer = false }: PlayerFollowButtonProps) {
   const t = useTranslations();
   const { user } = useAuth();
   const [hovered, setHovered] = useState(false);
   const [stateOverride, setStateOverride] = useState<{ playerId: string; state: FollowState }>();
   const action = useActionMutation();
   const queryClient = useQueryClient();

   const resolvedState = resolveFollowState(user, playerId, followsViewer);
   const state = stateOverride?.playerId === playerId ? stateOverride.state : resolvedState.state;
   const isPlatformFriend = resolvedState.platformFriend;

   if (!user || user.id === playerId) return null;

   const pending = action.isPending;
   const isFollowing = state === 'following' || state === 'mutual';
   const showUnfollow = isFollowing && hovered && !pending && !isPlatformFriend;

   function handleClick() {
      if (isPlatformFriend) return;

      const mutate = isFollowing ? () => unfollowPlayer(playerId) : () => followPlayer(playerId);
      const errorMessage = isFollowing ? t('player.failedToUnfollow') : t('player.failedToFollow');

      action.mutate(mutate, {
         onSuccess: () => {
            const nextState = isFollowing ? (state === 'mutual' ? 'follower' : 'none') : state === 'follower' ? 'mutual' : 'following';

            setHovered(false);
            setStateOverride({ playerId, state: nextState });
            void queryClient.invalidateQueries({ queryKey: ['playerRelationships'] });
         },
         onError: () => toast.error(errorMessage)
      });
   }

   const label = showUnfollow
      ? t('player.unfollow')
      : state === 'mutual'
        ? t('player.mutual')
        : state === 'following'
          ? t('player.followingStatus')
          : state === 'follower'
            ? t('player.followBack')
            : t('player.follow');
   const compactIconClass = compact ? 'size-2.5' : undefined;
   const accentSolidStyle: CSSProperties = {
      borderColor: 'var(--profile-accent, var(--primary))',
      backgroundColor: 'var(--profile-accent, var(--primary))',
      color: 'var(--profile-accent-foreground, var(--primary-foreground))'
   };
   const accentActiveStyle: CSSProperties = {
      borderColor: 'var(--profile-accent, var(--primary))',
      backgroundColor: 'var(--profile-accent, var(--primary))',
      color: 'var(--profile-accent-active-foreground, var(--profile-accent-foreground, var(--primary-foreground)))'
   };
   const accentSubtleStyle: CSSProperties = {
      borderColor: 'color-mix(in srgb, var(--profile-accent, var(--primary)) 35%, transparent)',
      backgroundColor: 'color-mix(in srgb, var(--profile-accent, var(--primary)) 12%, transparent)',
      color: 'var(--profile-accent-foreground, var(--profile-accent, var(--primary)))'
   };
   const accentStyle = showUnfollow ? undefined : isFollowing ? accentActiveStyle : accentSolidStyle;

   const icon = pending ? (
      <Loader2 className={cn('animate-spin', compactIconClass)} />
   ) : showUnfollow ? (
      <FaUserPlus className={cn('rotate-45', compactIconClass)} />
   ) : state === 'mutual' ? (
      <FaUserFriends className={compactIconClass} />
   ) : state === 'following' ? (
      <FaUserCheck className={compactIconClass} />
   ) : (
      <FaUserPlus className={compactIconClass} />
   );

   if (isPlatformFriend) {
      return (
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  variant={compact ? 'outline' : 'secondary'}
                  size={compact ? 'icon' : 'xs'}
                  className={cn('cursor-not-allowed opacity-70', compact && 'rounded-full')}
                  style={accentSubtleStyle}
                  disabled
               >
                  {state === 'mutual' ? <FaUserFriends className={compactIconClass} /> : <FaUserCheck className={compactIconClass} />}
                  {!compact && (state === 'mutual' ? t('player.mutual') : t('player.followingStatus'))}
               </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-64 text-center">
               <p>{t('player.platformFriendsTooltip')}</p>
            </TooltipContent>
         </Tooltip>
      );
   }

   const button = (
      <Button
         variant={compact ? 'outline' : state === 'none' || state === 'follower' ? 'default' : 'secondary'}
         size={compact ? 'icon' : 'xs'}
         className={cn(
            'cursor-pointer transition-[background-color,color,border-color]',
            compact && 'rounded-full',
            showUnfollow && 'border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15'
         )}
         style={accentStyle}
         disabled={pending}
         onClick={handleClick}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         aria-label={compact ? label : undefined}
      >
         {icon}
         {!compact && label}
      </Button>
   );

   if (compact) {
      return (
         <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
               <p>{label}</p>
            </TooltipContent>
         </Tooltip>
      );
   }

   return button;
}

function resolveFollowState(user: ReturnType<typeof useAuth>['user'], playerId: string, followsViewer: boolean): ResolvedFollowState {
   if (!user) return { state: 'none', platformFriend: false };

   const mutual = user.relationships.mutuals.find((relationship) => relationship.id === playerId);
   if (mutual) return { state: 'mutual', platformFriend: mutual.relation === 'platform-friend' };

   const following = user.relationships.following.find((relationship) => relationship.id === playerId);
   if (following) return { state: 'following', platformFriend: following.relation === 'platform-friend' };

   return { state: followsViewer ? 'follower' : 'none', platformFriend: false };
}
