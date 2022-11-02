export function setCardInput(user_id, currentDate, card, newcard) {
  return {
    snapshotId: card.snapshotId,
    currentDate,
    createdBy: user_id,
    category: card.category,
    startDate: card.period.startDate,
    endDate: card.period.endDate,
    colorCode: card.colorCode,
    todos: newcard,
    imgUrl: card.imgUrl,
    description: card.description,
    x: card.x,
    y: card.y,
  };
}
