from flask import Flask, render_template, request
from PIL import Image
import base64
from io import BytesIO
import requests
import numpy as np

app = Flask(__name__)

def return_image(image):
    data = BytesIO()
    image.save(data, "PNG")
    encoded_img_data = base64.b64encode(data.getvalue())
    return encoded_img_data

def generateRandomNumber(lowIn, highIn, sizeIn):
    rng = np.random.default_rng(42)
    ranNumberArray = rng.integers(low=lowIn, high=highIn, size=sizeIn)
    return ranNumberArray

def convert_stars(stars):
    if stars < 10:
        return 5 
    elif stars < 51:
        return 10
    elif stars < 1001:
        return 15
    else:
        return 20

def image(yel_stars,r=250,g=250,b=250):
    #generate background color
    first_im = Image.new(mode="RGBA", size=(300, 300), color = (r,g,b))

    #get star image        
    star_url='https://cdn.pixabay.com/photo/2017/01/07/21/22/stars-1961613_1280.png'
    img = requests.get(star_url).content
    #preprocess star image
    team_img = Image.open(BytesIO(img)).convert("RGBA")
    team_img = team_img.resize((40, 20), resample=Image.NEAREST)

    #generate the location of stars *2 for x and y axis
    hor = generateRandomNumber(0,280,yel_stars*2)
    #put on the image
    for x in range(yel_stars):
        first_im.paste(team_img,(hor[x],hor[x+yel_stars]), team_img)
    return first_im

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route('/mint', methods=['POST', 'GET'])
def mint():
    if request.method == 'POST':
        #get data from the form
        data = [x for x in request.form.values()]
        pic_team = data[0]
        stars = int(data[1])

        #convert stars number
        yel_stars = convert_stars(stars)
        first_im=image(yel_stars)


        #request for the image from url
        pic_team = requests.get(pic_team).content
        
        #preprocess image
        team_img = Image.open(BytesIO(pic_team)).convert("RGBA")
        team_img = team_img.resize((200, 200), resample=Image.NEAREST)
        first_im.paste(team_img,(50,0), team_img)

        #pass image to the user
        img_data = return_image(first_im)


    else:
        if request.args.get('r'):
            r = int(request.args.get('r'))
        else:
            r=250
        if request.args.get('g'):
            g = int(request.args.get('g'))
        else:
            g=250
        if request.args.get('b'):
            b = int(request.args.get('b'))
        else:
            b=250
        if request.args.get('stars'):
            stars = int(request.args.get('stars'))
            yel_stars = convert_stars(stars)
        else:
            yel_stars = 0

        #generate image
        first_im=image(yel_stars,r,g,b)
        #pass image to the user
        img_data = return_image(first_im)

    return render_template("mint.html", img_data=img_data.decode('utf-8'))