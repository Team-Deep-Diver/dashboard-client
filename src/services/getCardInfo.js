export function getCardInfo(data) {
  const cardInfoArr = [];

  data?.map((card) => {
    const { _id, colorCode, period, snapshots } = card;

    if (snapshots.length > 0) {
      const cardContent = snapshots[0].value;

      const cardInfo = {
        cardId: _id,
        snapshotId: snapshots[0]._id,
        colorCode,
        period,
        category: snapshots[0].category,
        todo: cardContent.todos,
        imgUrl: cardContent.imgUrl,
        description: cardContent.description,
        x: snapshots[0].coordinate.x,
        y: snapshots[0].coordinate.y,
        width: 5,
        height: 3,
      };

      cardInfoArr.push(cardInfo);
    }
  });

  return cardInfoArr;
}
