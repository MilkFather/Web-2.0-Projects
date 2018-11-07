from PIL import Image
import numpy as np

def arr2color(arr):
    # assume the color is in RGB format
    return (arr[0] << 16) + (arr[1] << 8) + arr[2]

def HTMLtable(im, id):
    (h, w) = im.shape
    s = ""
    s += "<table class = \"pxart\" id = \"" + id + "\">\n"
    for y in range(h):
        s += "\t<tr>\n\t\t"
        for x in range(w):
            s += "<th palette = \"" + str(im[y, x]) + "\"></th>"
        s += "\n\t</tr>\n"
    s += "</table>"
    return s

def CSS(dict, id):
    s = ""
    #print(len(dict))
    s += ".pxart {\n\tborder: none;\n\tborder-collapse: collapse;\n}\n\n"
    for i in range(len(dict)):
        #s += ".pxart#" + id + ">tr>th[palette = \"" + str(i) + "\"] {\n"
        s += "#" + id + ".pxart>tbody>tr>th[palette = \"" + str(i) + "\"] {\n"
        #s += "[palette = \"" + str(i) + "\"] {\n"
        s += "\tbackground-color: #" + hex(dict[i]).split('x')[1] + ";\n}\n\n"
    return s

def px(image):
    """
    Premise: the pixel should be 1:1
    """

    (w, h) = image.size
    arr = np.array(image)
    arrmap = np.array(np.zeros((h, w)), dtype = int)

    colordict = []

    for y in range(h):
        for x in range(w):
            # colors and attach to dict
            c = arr2color(arr[y, x, :])
            if c not in colordict:
                colordict.append(c)
                #print(colordict)
            #print(y, x)
            arrmap[y, x] = colordict.index(c)

    s1 = HTMLtable(arrmap, "pxart1")
    s2 = CSS(colordict, "pxart1")

    print(s1)

pth = input()
im = Image.open(pth)
px(im)
