from PIL import Image
import os
# 定义图片文件夹路径
folder_path = 'C:/Users/86139/Desktop/web/img'
array=[[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[3,3],[3,4],[3,5],[3,6],[4,3],[5,3],[6,3],[6,4],[6,5],[6,6],[4,6],[5,6]]
# 遍历文件夹中的所有图片文件
for filename in os.listdir(folder_path):
    print(filename)
    if ('range' in filename) & ('17.png' in filename) : 
        print(1)
        image_path = os.path.join(folder_path, filename)
        # 打开图片
        with Image.open(image_path) as img:
            for x in range(1,3100,1):
                for y in range(1,3100,1):
                    pixel_color = img.getpixel((x, y))
                    if(not pixel_color==(0,0,0,0)): 
                        if(pixel_color==(162,29,192,225)):
                            img.putpixel((x,y), (pixel_color[0],pixel_color[1],pixel_color[2],205))
                        else:
                            img.putpixel((x,y), (pixel_color[0],pixel_color[1],pixel_color[2],185))
            # 保存修改后的图片
            img.save(image_path)

# 打印完成信息
print("Image processing completed.")