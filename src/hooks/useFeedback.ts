import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Feedback, FeedbackFormValues } from '../types/feedback';
import { fetchFeedbacks, fetchFeedbackStats, submitFeedback } from '../api/feedbackService';

export const useFeedbacks = () => {
  return useQuery<Feedback[]>({
    queryKey: ['feedbacks'],
    queryFn: fetchFeedbacks,
  });
};

export const useFeedbackStats = () => {
  return useQuery({
    queryKey: ['feedbackStats'],
    queryFn: fetchFeedbackStats,
  });
};

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Feedback, Error, FeedbackFormValues>({
    mutationFn: submitFeedback,
    onSuccess: () => {
      // Invalidate and refetch feedbacks and stats after successful submission
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      queryClient.invalidateQueries({ queryKey: ['feedbackStats'] });
    },
  });
};
