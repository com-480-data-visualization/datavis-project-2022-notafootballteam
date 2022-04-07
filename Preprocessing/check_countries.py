import csv 

countries_in_alcohol = set()
countries_in_happiness = set()

with open('../Data/world-happiness-report.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count != 0:
            countries_in_happiness.add(str(row[0]))
        line_count += 1



with open('../Data/alcohol-consumption.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0  
    for row in csv_reader:
        if line_count != 0:
            countries_in_alcohol.add(str(row[0]))
        line_count +=1

diff = countries_in_alcohol - countries_in_happiness  
print("In Alcohol only:")
print(len(diff))
print(diff)
print()

print("In Happiness Only:")
diff_2 = countries_in_happiness - countries_in_alcohol
print(len(diff_2))
print(diff_2)
