from PIL import Image
import os
# 定义图片文件夹路径
folder_path = 'C:/Users/86139/Desktop/web/img'

for filename in os.listdir(folder_path):
    print(filename)
    if filename.startswith('range') & (not filename.startswith('rangeA'))& (not filename.startswith('rangeB'))& (not filename.startswith('rangeC')): 
        print(1)
        image_path = os.path.join(folder_path, filename)
        with Image.open(image_path) as img:
            image_path = os.path.join(folder_path, filename)
            new_name=filename.replace('range','rangeA')
            new_image_path=os.path.join(folder_path,new_name)
            img.save(new_image_path)

# 打印完成信息
print("Image processing completed.")