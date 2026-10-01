'use client';

import { User } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { PlayerLink } from '@/modules/player/shared/player-link';
import { qatDeleteComment, qatEditComment } from '@/modules/rank-requests/actions/qat';
import { rtDeleteComment, rtEditComment } from '@/modules/rank-requests/actions/rt';
import type { RankingControllerGetRequestByIdResponse } from '@/shared/api/generated/ApiParams';
import { Comment } from '@/shared/components/comments/comment';
import { cn } from '@/shared/format/helpers';
import Permissions from '@/shared/permissions';

const COMMENT_GROUP_BADGE_CLASS = {
   RT: 'bg-role-rt/15 text-role-rt',
   QAT: 'bg-role-qat/15 text-role-qat'
};

const COMMENT_GROUP_ACCENT_CLASS = {
   RT: 'border-l-role-rt',
   QAT: 'border-l-role-qat'
};

export function RankRequestComment({ comment, obfuscated, group, difficultyId }: RankRequestCommentProps) {
   const { user } = useAuth();

   const isOwner = user?.id === comment.player.id;
   const userPermissions = user?.permissions ?? 0;
   const canModerateAnyComment =
      Permissions.checkPermissionNumber(userPermissions, Permissions.security.PANDA) ||
      Permissions.checkPermissionNumber(userPermissions, Permissions.security.ADMIN) ||
      Permissions.checkPermissionNumber(userPermissions, Permissions.security.NAT);
   const canModerateQatComment = group === 'QAT' && Permissions.checkPermissionNumber(userPermissions, Permissions.security.QATHead);
   const canModify = isOwner || canModerateAnyComment || canModerateQatComment;

   const avatarImage = obfuscated ? (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: hashToColor(comment.player.name) }}>
         <User className="text-muted-foreground size-4" />
      </div>
   ) : (
      <PlayerAvatar
         src={comment.player.avatar}
         version={comment.player.avatarVersion}
         alt={comment.player.name}
         width={32}
         height={32}
         className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
   );

   const avatar = (
      <div className="flex shrink-0 flex-col items-center gap-1">
         {avatarImage}
         <span
            className={cn(
               'inline-flex w-8 items-center justify-center rounded px-1 py-0.5 text-[9px] leading-none font-semibold tracking-wide',
               COMMENT_GROUP_BADGE_CLASS[group]
            )}
            title={group === 'RT' ? 'Ranking Team' : 'Quality Assurance Team'}
         >
            {group}
         </span>
      </div>
   );

   const author = obfuscated ? (
      <span className="text-muted-foreground text-sm font-semibold">{comment.player.name.slice(0, 8)}</span>
   ) : (
      <PlayerLink player={comment.player} className="text-sm font-semibold" />
   );

   function handleEdit(next: string) {
      const action = group === 'RT' ? rtEditComment : qatEditComment;
      return action(difficultyId, comment.id, next);
   }

   function handleDelete() {
      const action = group === 'RT' ? rtDeleteComment : qatDeleteComment;
      return action(difficultyId, comment.id);
   }

   return (
      <div className={cn('border-l-2 pl-3', COMMENT_GROUP_ACCENT_CLASS[group])}>
         <Comment
            avatar={avatar}
            author={author}
            content={comment.comment}
            createdAt={comment.createdAt}
            edited={comment.edited}
            canModify={canModify}
            onEditAction={handleEdit}
            onDeleteAction={handleDelete}
         />
      </div>
   );
}

// derive a consistent hsl color from the first 8 hex chars of a hash
function hashToColor(hash: string) {
   const hex = hash.slice(0, 8);
   const num = parseInt(hex, 16);
   const hue = Number.isFinite(num) ? num % 360 : 0;
   return `hsl(${hue}, 55%, 55%)`;
}

interface RankRequestCommentProps {
   comment: RankingControllerGetRequestByIdResponse['difficulties'][number]['rtComments'][number];
   obfuscated: boolean;
   group: 'RT' | 'QAT';
   difficultyId: number;
}
