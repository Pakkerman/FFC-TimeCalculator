const weekday = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

// Assume inputs are valid
function add_time(start: string, duration: string, starting?: string): string {
  console.log('\n -- add_time -- ')

  const startInputs = start.split(/:| /)
  const durationInputs = duration.split(':')

  // get inputs
  const startHour = +startInputs[0]
  const startMinute = +startInputs[1]
  const meridiem = startInputs[2]
  const durationHours = +durationInputs[0]
  const durationMinutes = +durationInputs[1]

  // calculate
  const minuteCarryOver = Math.floor((startMinute + durationMinutes) / 60)
  const merdiumOffset = meridiem === 'PM' ? 12 : 0

  // get hours in 24 hour format
  const hourSum = startHour + durationHours + minuteCarryOver + merdiumOffset
  const minuteSum = (startMinute + durationMinutes) % 60

  // format outputs
  const outputHour = hourSum % 12 === 0 ? 12 : hourSum % 12
  const outputMinute = minuteSum.toString().padStart(2, '0')
  const dayString = getDayString(hourSum, starting)
  const outputMeridiem = getMeridiem(
    durationHours + startHour + minuteCarryOver,
    meridiem
  )

  return `result:\t\t ${outputHour}:${outputMinute} ${outputMeridiem}${dayString}`
}

function getMeridiem(hour: number, meridiem: string): string {
  const meridiemCycles = Math.floor(hour / 12)
  let meridiemOffset = meridiem === 'AM' ? 0 : 1

  if ((meridiemOffset + meridiemCycles) % 2 === 0) return 'AM'
  else return 'PM'
}

function getDayString(hourSum: number, starting?: string): string {
  const days = Math.floor(hourSum / 24)
  let daysOutput = ''
  if (days === 1) daysOutput = ' (next day)'
  if (2 <= days) daysOutput = ` (${days} days later)`

  let weekdayOutput = ''
  if (starting) {
    const weekdayIdx = weekday.lastIndexOf(starting.toLowerCase())
    weekdayOutput = weekday[(weekdayIdx + days) % 7]
    weekdayOutput = `, ${
      weekdayOutput[0].toUpperCase() + weekdayOutput.slice(1)
    }`
  }

  return `${weekdayOutput}${daysOutput}`
}

console.log(add_time('11:30 AM', '2:32', 'Monday'))
console.log('expected:\t 2:02 PM, Monday\n')
console.log(add_time('11:43 AM', '00:20'))
console.log('expected:\t 12:03 PM\n')
console.log(add_time('10:10 PM', '3:30'))
console.log('expected:\t 1:40 AM (next day)\n')
console.log(add_time('11:43 PM', '24:20', 'tueSday'))
console.log('expected:\t 12:03 AM, Thursday (2 days later)\n')
console.log(add_time('6:30 PM', '205:12'))
console.log('expected:\t 7:42 AM (9 days later)\n')
