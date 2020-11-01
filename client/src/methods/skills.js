export function calculatedSkill (category, difficulty) {
  const skills = {
    str: 0,
    int: 0,
    cul: 0,
    cha: 0,
    hum: 0
  }
  switch (category) {
    case 'not':
      skills.str = 1
      skills.int = 1
      skills.cul = 1
      skills.cha = 1
      skills.hum = 1
      break
    case 'art':
      skills.cul = difficulty * 2
      break
    case 'career':
      skills.cha = difficulty * 2
      break
    case 'sport':
      skills.str = difficulty * 2
      break
    case 'fun':
      skills.str = difficulty
      break
    case 'household':
      skills.str = difficulty
      skills.cha = difficulty
      break
    case 'humanity':
      skills.hum = difficulty * 2
      break
    case 'mental':
      skills.int = difficulty
      skills.cul = difficulty
      break
    case 'outdoors':
      skills.cul = difficulty * 2
      break
    case 'reading':
      skills.int = difficulty * 2
      skills.cul = difficulty
      break
    case 'learning':
      skills.int = difficulty
      skills.cul = difficulty
      break
    case 'social':
      skills.cha = difficulty * 2
      break
    case 'travel':
      skills.cha = difficulty
      skills.cul = difficulty
      break
  }
  return skills
}
