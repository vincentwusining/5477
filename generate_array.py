import os
ab=[];
for file in os.listdir("C:/Users/86139/Desktop/web/audio" ):
    ab.append("./audio/"+file);
print(ab)