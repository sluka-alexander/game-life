export function xpMethod (xp) {
  const levelData = {
    level: 0,
    to: 0,
    from: 0
  }

  if (xp >= 0 && xp <= 499) {
    levelData.level = 1
    levelData.to = 0
    levelData.from = 499
  }
  if (xp >= 500 && xp <= 999) {
    levelData.level = 2
    levelData.to = 500
    levelData.from = 999
  }
  if (xp >= 1000 && xp <= 1999) {
    levelData.level = 3
    levelData.to = 1000
    levelData.from = 1999
  }
  if (xp >= 2000 && xp <= 2999) {
    levelData.level = 4
    levelData.to = 2000
    levelData.from = 2999
  }
  if (xp >= 3000 && xp <= 3999) {
    levelData.level = 5
    levelData.to = 3000
    levelData.from = 3999
  }
  if (xp >= 4000 && xp <= 4999) {
    levelData.level = 6
    levelData.to = 4000
    levelData.from = 4999
  }
  if (xp >= 5000 && xp <= 6999) {
    levelData.level = 7
    levelData.to = 5000
    levelData.from = 6999
  }
  if (xp >= 7000 && xp <= 9990) {
    levelData.level = 7
    levelData.to = 7000
    levelData.from = 9999
  }
  return levelData
}
