'use client';

import { useMemo } from 'react';

import { useTranslations } from 'use-intl';

import { useAuth } from '@/modules/auth';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { qatComment } from '@/modules/rank-requests/actions/qat';
import { rtComment } from '@/modules/rank-requests/actions/rt';
import { CommentForm, type CommentFormAction } from '@/shared/components/comments/comment-form';

type CommentGroup = 'RT' | 'QAT';

const COMMENT_GROUP_STORAGE_KEY = 'rank-request-comment-group';
const COMMENT_GROUP_TEXTAREA_CLASS = {
   RT: 'border-role-rt focus-visible:border-role-rt focus-visible:ring-role-rt/30',
   QAT: 'border-role-qat focus-visible:border-role-qat focus-visible:ring-role-qat/30'
};

interface RankRequestCommentFormProps {
   difficultyId: number;
   groups: CommentGroup[];
}

export function RankRequestCommentForm({ difficultyId, groups }: RankRequestCommentFormProps) {
   const t = useTranslations();
   const { user } = useAuth();

   const actions = useMemo<CommentFormAction[]>(() => {
      const hasMultiple = groups.length > 1;
      return groups.map((group) => ({
         key: group,
         dropdownLabel: t('rankRequest.replyAs', { group }),
         submitLabel: t('comments.reply'),
         textareaClassName: hasMultiple ? COMMENT_GROUP_TEXTAREA_CLASS[group] : undefined,
         onSubmit: async (content) => {
            const action = group === 'RT' ? rtComment : qatComment;
            return action(difficultyId, content);
         }
      }));
   }, [groups, difficultyId, t]);

   const avatar = user ? (
      <PlayerAvatar
         src={user.avatar}
         version={user.avatarVersion}
         alt={user.name}
         width={32}
         height={32}
         className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
   ) : (
      <div className="bg-muted h-8 w-8 shrink-0 rounded-full" />
   );

   return <CommentForm avatar={avatar} actions={actions} storageKey={COMMENT_GROUP_STORAGE_KEY} />;
}
