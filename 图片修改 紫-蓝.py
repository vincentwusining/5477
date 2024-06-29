from PIL import Image
import os
# 定义图片文件夹路径
folder_path = 'C:/Users/86139/Desktop/web/img'
array=[[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[2,4],[2,5],[4,2],[5,2],[4,7],[5,7],[7,4],[7,5]]
# 遍历文件夹中的所有图片文件
for filename in os.listdir(folder_path):
    print(filename)
    if filename.startswith('range') & (not filename.startswith('rangeA'))& (not filename.startswith('rangeB'))& (not filename.startswith('rangeC')): 
        print(1)
        image_path = os.path.join(folder_path, filename)
        # 打开图片
        with Image.open(image_path) as img:
            for x in range(0,3100,100):
                for y in range(0,3100,100):
                    # 获取当前像素的颜色
                    pixel_color = img.getpixel((x, y))
                    if pixel_color ==(88,88,88,255):
                        print('hit')
                        for i in range(len(array)):
                            for j in range(0,10,1):
                                for k in range(0,10,1):
                                    img.putpixel((x+array[i][0]*10+j, y+array[i][1]*10+k), (0,168,243,255))
            
            for x in range(0,3100,1):
                for y in range(0,3100,1):
                    pixel_color = img.getpixel((x, y))
                    if pixel_color ==(162,29,192,255):
                        img.putpixel((x,y), (0,0,0,0))
            # 保存修改后的图片
            new_name=filename.replace('range','rangeC')
            new_image_path=os.path.join(folder_path,new_name)
            img.save(new_image_path)

# 打印完成信息
print("Image processing completed.")