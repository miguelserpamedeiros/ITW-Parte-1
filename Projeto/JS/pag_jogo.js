function compareImg(class_img1,class_img2,id_img1,id_img2){
    return class_img1 == class_img2 && id_img1 != id_img2
}

const class1= document.getElementsByClassName('par1');
const class2 = document.getElementsByClassName('par2');
const id1 = document.getElementById('img11');
const id2 = document.getElementById('img7');


if (compareImg(class1,class2,id1,id2)) {
    console.log('As imagens são iguais.');
} else {
    console.log('As imagens são diferentes.');
}