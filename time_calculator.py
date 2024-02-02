weekday = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]


def add_time(start, duration, day=None):
    print(f'\n-----Add Time-----')

    startInputs = start.split(' ')
    startTime = startInputs[0].split(':')
    durationInputs = duration.split(':')

    startHour = int(startTime[0])
    startMinute = int(startTime[1])
    meridiem = startInputs[1]
    durationHour = int(durationInputs[0])
    durationMinute = int(durationInputs[1])

    minuteCarryOver = (startMinute + durationMinute) // 60
    meridiemOffset = 0 if meridiem == "AM" else 12 

    hourSum = startHour + durationHour + minuteCarryOver + meridiemOffset
    minuteSum = (startMinute + durationMinute) % 60

    outputHour = 12 if hourSum % 12 == 0 else hourSum % 12
    outputMinute = str(minuteSum).zfill(2)
    outputMeridiem = getMeridiem(durationHour + startHour + minuteCarryOver, meridiem)
    outputWeekday = getWeekday(hourSum, day)

    print(f'hourSum: {hourSum}, minuteSum: {minuteSum}')


    return f'{outputHour}:{outputMinute} {outputMeridiem}{outputWeekday}'
    # print(f'meridiemOffset: {meridiemOffset}')
    # print(f'carryover: {minuteCarryOver}')
    # print(startHour, startMinute,meridiem)


def getMeridiem(hour, meridiem):  
  meridiemCycles = hour // 12
  meridiemOffset = 0 if meridiem == 'AM' else 1

  if (meridiemOffset + meridiemCycles) % 2 == 0:
    return 'AM'
  else:
    return 'PM'


def getWeekday(hourSum, day):
  days = hourSum // 24
  daysOutput = ''
  if days == 1:
    daysOutput = f' (next day)'
  if 2 <= days:
    daysOutput = f' ({days} days later)'

  weekdayOutput = ''
  if day:
    weekdayIdx = weekday.index(day.lower())
    weekdayOutput = weekday[(weekdayIdx + days) % 7]
    weekdayOutput = f', {weekdayOutput[0].upper() + weekdayOutput[1:]}'
  
  return f'{weekdayOutput}{daysOutput}'


print(f"result:\t\t{add_time('11:30 AM', '2:32', 'Monday')}")
print('expected:\t2:02 PM, Monday\n')
print(f"result:\t\t{add_time('11:43 AM', '00:20')}")
print('expected:\t12:03 PM\n')
print(f"result:\t\t{add_time('10:10 PM', '3:30')}")
print('expected:\t1:40 AM (next day)\n')
print(f"result:\t\t{add_time('11:43 PM', '24:20', 'tueSday')}")
print('expected:\t12:03 AM, Thursday (2 days later)\n')
print(f"result:\t\t{add_time('6:30 PM', '205:12')}")
print('expected:\t7:42 AM (9 days later)\n')




