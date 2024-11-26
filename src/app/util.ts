export const calculateDateDifference = (deadline: string | Date): number => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    
    if (isNaN(deadlineDate.getTime())) {
      throw new Error("Invalid date");
    }
    
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 1000 ms * 3600 sec * 24 hours
    
    return daysRemaining;
  };
  