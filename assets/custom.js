/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
*/ 

/*Loader Code On instock/ Special order change fabric */
function loaderMain(){
  let loaderDisplay = document.querySelector('.loader-wrap #loader2'); 
  let mediaContainer = document.querySelector(".product-gallery .product-gallery__carousel-wrapper");
  let yourElement = document.querySelector('.product-gallery__fabric');
  let loaderDiv = document.querySelector(".loader-wrap");
  let elementHeight = yourElement.offsetHeight;
function loaderView(){  
  loaderDiv.style.height = elementHeight + "px";
    mediaContainer.style.position = 'absolute';
    mediaContainer.style.top = '0';
window.addEventListener("resize",() => {
  if (window.innerWidth <= 900){
  let elementHeight = yourElement.offsetHeight;
    loaderDiv.style.height = elementHeight + "px";
    mediaContainer.style.position = 'absolute';
    mediaContainer.style.top = '0';  
  }
});
}
if (window.innerWidth <= 900) {
   loaderView();
  }
else{
  window.addEventListener("resize",() => {
  if (window.innerWidth <= 900){
  let elementHeight = yourElement.offsetHeight;
    loaderDiv.style.height = elementHeight + "px";
      mediaContainer.style.position = 'absolute';
      mediaContainer.style.top = '0';   
  }
  });
} 
}

(function () {
  //global selector 
    let specialOrderCheck = 'false';
    let baseColorName = 'Beach Sisal';
    let special_color_name = 'Action-Linen_44285-0000';
    let dropdown_value='24"x36"';
    let var_id_final='';
    let sku_no='';
    let base_no=';'
    let Fab_result="";
    let shape_result="";
    var arr=[];
    let FinalStr='';
    const selector = (element) => {
        const query = document.querySelectorAll(element);
        let ele = "";
        (query.length > 1) ? ele = query : ele = query[0];
        return ele;
    }
/* Special Order Program Start From Here 19-10-23   
select both button and call specific functions to execute for several tasks.
For In Stock variable(specialOrderCheck) will be false and for Special order Variable(specialOrderCheck) will be true.
*/
document.querySelectorAll('.changeButton').forEach((par) => {
    par.addEventListener('click', function(event) {
      if(par.innerHTML == 'In Stock'){
        changeButton(event.target);
        specialOrderCheck = 'false';
        
        // change main image border on fabric chnage
        let borderImage = selector('.base-fabric--slider img')[0].dataset.borderSrc;
        let corenrImage = borderImage.replace('IOR','IOC');
        imageHandler(corenrImage, borderImage);
        selector('.specialOrderMain').style.display = 'none';
        selector('.inStockMain').style.display = 'block';
        // Hide In special fabric and show instock facric
        selector('.product-form__variants').style.display = 'block';
        selector('.product-form__add-button').style.display = 'block';
        selector('.specialOrder_addToCartBtn').style.display = 'none';
        // Change Fabric Of View All Button 
        selector('.instock-modal').style.display = 'flex';
        selector('.specialOder-modal').style.display = 'none';
        // change view all heading 
        selector('#view_all_heading').innerHTML='In Stock Fabric Patterns';
        // change fabric name under the main image 
        selector('.second_span').innerHTML = selector('.instock-fabric')[0].dataset.styleNumber.split('-')[1];
        // change date availablity 
        selector('#nextAvailability').innerText = 'Make-To-Order (requires 2-3 week production time)';
        // change title on button switch instock from special order button
        changeTitle('false');
        // Change color name when button change in description for the first time 
        selector('#color_number').innerHTML = "Color: "+ selector('.active-fabric').dataset.styleNumber;
      }else{
        document.getElementById("loader2").style.display = "block"; 
        loaderMain();
        changeButton(event.target);
        specialOrderCheck = 'true';
        // change main image border on fabric chnage
        let borderImageSpecial = selector('.special_orderFabric img')[0].dataset.borderSrc;
        let corenrImageSpecial = borderImageSpecial.replace('IOR','IOC');
        imageHandler(corenrImageSpecial, borderImageSpecial);
        selector('.inStockMain').style.display = 'none';
        selector('.specialOrderMain').style.display = 'flex';
        // Hide In Stock fabric and show special order facric
        selector('.product-form__variants').style.display = 'none';
        selector('.product-form__add-button').style.display = 'none';
        selector('.specialOrder_addToCartBtn').style.display = 'block';
        // Change Fabric Of View All Button 
        selector('.instock-modal').style.display = 'none';
        selector('.specialOder-modal').style.display = 'flex';
        // change view all heading 
        selector('#view_all_heading').innerHTML ='Special Order Fabric Patterns';
        // change fabric name under the main image 
        selector('.second_span').innerHTML = selector('.special__order')[0].dataset.specialColor.split('_')[0];
        // change date availablity 
        selector('#nextAvailability').innerText = 'Make-To-Order (requires 3-4 week production time)';
        // Change Title 
        changeTitle('true');
        // Change color name when button change in description for the first time 
        selector('#color_number').innerHTML ="Color: "+ selector('.active-special').dataset.styleNumber;
      }
    });
});

/* Change the button and add activeBtn class On selected Button (Instock & Special order) */
function changeButton(params) {
  document.querySelectorAll('.changeButton').forEach((otherSpan) => {
    if(otherSpan == params){
      otherSpan.classList.add('activeBtn');
    }else{
      otherSpan.classList.remove('activeBtn');
    }
  });
}

/**
  * @function: specialOrder
  * @argument: specialSku:Final SKU for special order Program.
  * @return: calling (addProductnow) function with variant ID and specialSKU of Special order,
  *@description: Getting the Final Sku for special order and fetching the variant ID of special order product with the help of SKU 
                 and product.json(); (creative-concepts-tool.js) is the handle of special order program product where the product name
                 is Creative Concepts Tool (with product ID : 7278332969140).
 */
async function specialOrder(specialSku) {
  specialSku = specialSku.replace(/\s/g, '');
    try {
        const product = await fetch(window.Shopify.routes.root + 'products/creative-concepts-tool.js');
        const data = await product.json();
        let data_variants  = await data.variants;
        data_variants.forEach((e)=>{
          let spe_title = e.title.replace(/ /g,'');
          // Only for rectangle 17 is here because SOF is added and color code 3 digit removed same for 13 and 9
          if(specialSku.length == 17){
           let rec_string = 'Rectangle'+'/'+dropdown_value;
            let rec_string2 =  rec_string.replace(/ /g,'');
            if(rec_string2 == spe_title){
               var_id_final = e.id;
            }
          }
          // Only For octagon except 4"
          if(specialSku.length == 13){
            let oct_string = 'Octagon'+'/'+dropdown_value;
            let oct_string2 = oct_string.replace(/ /g,'');
            if(oct_string2 == spe_title){
              var_id_final = e.id;
            }
          }
        });
      // only for octagon first round 4"
      if(specialSku.length == 9){
        var_id_final = '42421443657908';
        specialSku = '2009GS0400394';
          }
      addProductnow(var_id_final,specialSku);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
  
/* Add product to cart after getting varient ID of special order product from the function (specialOrder) */
function addProductnow(var_id_fin,specialSkuSku) {
let fabric_corner_img = selector('.corner-gallery-img').getAttribute('src');
let base_corner_img = selector('.product-gallery__carousel-item.is-selected img').getAttribute('src');
$.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: {
              quantity: 1,
              id: var_id_fin,
              "properties":{ "Style": baseColorName,
                            "Color" : special_color_name,
                            "SKU" : specialSkuSku,
                            "Fabric Size" : '3"',
                            "Fabric" : fabric_corner_img,
                            "Base" : base_corner_img
                           }
          },
          dataType: 'json',
          success: function(data) {
            document.dispatchEvent(new CustomEvent('theme:loading:end'));
            var section = document.querySelector('.custom-product--template');
            section.dispatchEvent(new CustomEvent('product:added', {
                            bubbles: true,
                            detail: {
                              variant: var_id_fin,
                              quantity: 1
                            }
            }));
          }
      });
}
  
/**
  * @function: changeTitle
  * @argument: isEle:true/false
  * @return: null,
  *@description: Change title of product when varient is changes inside special order program
 */
function changeTitle(isEle) {
  let mainTitle = selector('.product-meta__title').innerText;
  if(isEle == 'true'){
    let spe1 = mainTitle.split('-');
    selector('.product-meta__title').innerText = "Creative Concepts Tool" +" -"+spe1[1]+"-"+spe1[2];
  }else{
    let sto1 = mainTitle.split('-');
    selector('.product-meta__title').innerText = "Creative Concepts Tool"+" -"+sto1[1]+"-"+sto1[2];
  }
}
  
/*
  Hide the URl value on cart page from the properties 
  (URL value contains corner image we have send this with properties to use on cart page)
*/
if(location.href.includes('/cart')){
let listItems = document.querySelectorAll('.line-item__property');
listItems.forEach(function(item) {
  let spanElement = item.querySelector('span');
  if (spanElement && spanElement.textContent.includes('URL:')) {
    item.style.display='none';
    item.textContent;
  }
});
}
/* 
  Special Order Program END Here 19-10-23 
  Creating SKU From Here on First Page Load (Reload)
*/
  let HandleName = location.href.split('/')[4];
  
setTimeout(function () {

  let e = document.querySelector(".swatch-drop-down")[0];
  let value = e.value;
  if(value == 'Custom'){
     arr = ['2009','R','C','00240036','394'];
  }else{
    arr = ['2009','R','S','00240036','394'];
  }
  let selectMainDiv2 = selector('.swatch-view-custom-image li')[1];
  let child_Nodes2 = selectMainDiv2.childNodes;
  let classList2 = child_Nodes2[0].classList;
  if(classList2.contains('swatch-selected')){
     arr = ['2009','G','C','','394'];
  }
},2000);
  
/* 
   get color on all prouducts form title and show below the image 
   reload based show description like- style, color, fabric
*/

if(HandleName == 'creative-concepts'){
  // Change the variant to default on page load 
  const baseNumber = document.querySelector("[data-first-base] img").getAttribute("title");
  const colorNumber = selector("img.active-fabric").title;
  const fabricName = selector("[data-img-name]")[0].getAttribute("data-img-name");
  selector("#style_number").innerHTML = `Style: ${baseNumber}`;
  selector("#color_number").innerHTML = `Color: ${colorNumber}`;
  selector("#fabric_name").innerHTML = `Fabric: ${fabricName}`;
}else{
  
  setTimeout(function clickingVariant() {
       var select_div = selector('.swatch-view-custom-image li');
    select_div.forEach( ele =>{
      ele.addEventListener('click',(el)=>{
        var value_color = ele.getAttribute('aria-label');
       // selector('#product-var-color').innerHTML=value_color;
      })
    });
  },2000);
}
/*------------custom variant code start here----------*/
const imageHandler = (src, borderSrc) => {
  const src2 = src.replace(/_Square/g, '');
  const propertyImg = selector("#imageChange");
  // selector('.corner-gallery-img').setAttribute('src',src2);
  // selector('.border-gallery-img').setAttribute('src',borderSrc);
  
  // removed Loop From Here this line 
   
  const fabricBorder = selector(".product-gallery__fabric");
  fabricBorder.innerHTML = `
    <img alt="fabricImage" class="preview-gallery-img corner-gallery-img" src=${src2} />
    <img alt="borderImage" class="preview-gallery-img border-gallery-img" src=${borderSrc} />
  `;
  propertyImg.value = src;
};
  
// Remove first Active Class of Image (Fabric)
const removeActive = ()=>{
  const activeFabric = selector(".active-fabric");
  if (activeFabric) {
    activeFabric.classList.remove("active-fabric");
  }
}
  
const removeActiveSpecial = ()=>{
  const activeFabricSpecial = selector(".active-special");
  if (activeFabricSpecial) {
    activeFabricSpecial.classList.remove("active-special");
  }
}

//show image preview on main image left side
const productTemp = selector(".custom-product--template");
if (productTemp?.getAttribute("data-template") === "product.creative") {
  selector(".select--fabric img").forEach(ele => {
    ele.addEventListener("click", event => {
    document.getElementById("loader2").style.display = "block"; 
      loaderMain();
      const src = event.target.src;
      if (event.target.tagName === "IMG" && event.target.className.includes('instock-fabric')) {
        if (src) {
          setTimeout(()=>{
          imageHandler(src, event.target.dataset.borderSrc);
            
          },1)
          // fabricImageHandler();
          removeActive();
          selector(".product_type_data span").innerHTML = event.target.dataset.productType;
          const fabRic_N = event.target.getAttribute('title').split('-');
          selector('#FabricColorCode').value = fabRic_N[1];
          selector('.second_span').innerHTML = fabRic_N[1];
          selector("#color_number").innerHTML = `Color: ${event.target.dataset.styleNumber}`;
          selector("#fabric_name").innerHTML = `Fabric: ${event.target.dataset.imgName}`;
          event.target.classList.add("active-fabric");
          arr[4] = event.target.dataset.code;
          
        }
      }else{
        // click event for special order fabrics for both inside view all and on front view 9 images
        imageHandler(src, event.target.dataset.borderSrc);
        removeActiveSpecial();
        event.target.classList.add("active-special");
        special_color_name =  event.target.dataset.specialColor;
        const fabRic_S = event.target.getAttribute('title').split('-');
        selector('.second_span').innerHTML = fabRic_S[2];
        selector('#color_number').innerHTML = 'Color: '+ event.target.getAttribute('title');
      }
    });
  });

// (Syed Code Start) handle change shape(Rectangle & Octagon) event
// Close Modal On Click outside The Div (View All)
window.onclick = function(event) {
  let modal = document.querySelector('.all-fabric--modal');
  if (event.target == modal) {
  modal.classList.remove('active');
  }
}
selector(".selector_rec_oct").forEach(ele => {
  ele.addEventListener("change",event =>{
    if(specialOrderCheck == 'true'){
      setTimeout(()=>{
      changeTitle('true');
        },300)
    }
    if(event.target.dataset.optionPosition == '1'){
      if( event.target.value == 'Octagon'){
        if(specialOrderCheck == 'true'){
          setTimeout(()=>{
          changeTitle('true');
            },300)
        }
        selector('.third_span').innerHTML='Octagon';
        arr[1]="G";
        var width_div= selector('.second_child_width')
        width_div.style.display='none';
      }
      else{
        
        if(specialOrderCheck == 'true'){
            setTimeout(()=>{
            changeTitle('true');
              },300)
        }
        selector('.third_span').innerHTML='Rectangle';
        arr[1]="R";
        var width_div= selector('.second_child_width')
        width_div.style.display='block';
      }
    }else{
        // For Rectangle Custom Option 
        if(event.target.value == 'Custom'){
            arr[2]="C";
            arr[3]='';
        }else{
          
           // For Options other then Custom Inside dropdown
           arr[2]="S";
           let inch_value= event.target.value;
           let remov_inch = inch_value.split("'").join("");
           let remov_inch2= inch_value.replace(/['"]+/g,'');
           dropdown_value = inch_value;
           if(inch_value.includes("x")){
             if(!inch_value.includes("Runner")){
               // For Option Which does Not Contain Runner In It 
                const digitCount = inch_value.replace(/[^0-9]/g, "").length;
                if(digitCount == '4'){
                  arr[1]="R";
                   var first_2=  remov_inch2.slice(0, 2);
                   var last_2= remov_inch2.slice(-2);
                   FinalStr = '00'+first_2 +'00'+last_2; 
                   arr[3]=FinalStr;
                }
                if(digitCount == '2'){
                  arr[1]="R";
                   var first_1=  remov_inch2.slice(0, 1);
                   var last_1= remov_inch2.slice(-1);
                   FinalStr = '0'+first_1+'00'+'0'+last_1+"00"; 
                   arr[3]=FinalStr;
                }
                if(digitCount == '3'){
                  arr[1]="R";
                   var first_one=  remov_inch2.slice(0, 1);
                   var last_two= remov_inch2.slice(-2);
                   FinalStr = '0'+first_one+'00'+last_two+"00"; 
                   arr[3]=FinalStr;
                }
             }else{
               
               // For Option Which Contain Runner In It 
               var ret = inch_value.replace(' Runner','');
               let remov_1inch = ret.split("'").join("");
               let remov_1inch2= ret.replace(/['"]+/g,'');
               var first_one_run=  remov_1inch2.slice(0, 2);
               var last_two_run= remov_1inch2.slice(-2);
               var arr_Runner = first_one_run.split("");
               const digitCountRunner = ret.replace(/[^0-9]/g, "").length;
                arr[1]='N';
              
               if(digitCountRunner == '3' ){
                 FinalStr ="0"+arr_Runner[0]+"0"+arr_Runner[1]+"0"+last_two_run+"00";
                 FinalStr=FinalStr.split(" ").join("");
                 console.log(FinalStr)
                 arr[3]=FinalStr;
               }
               if(digitCountRunner == '4' ){
                 FinalStr ="0"+arr_Runner[0]+"0"+arr_Runner[1]+last_two_run+"00";
                 
                 arr[3]=FinalStr;
               }
             }
           }
           else{
           
              const digitCount = inch_value.replace(/[^0-9]/g, "").length;
              if(digitCount == '1'){ 
                  arr[1]="R";
                  FinalStr = '0'+remov_inch+'00'; 
                  arr[3]=FinalStr;
              }else{
                arr[1]="R";
                  FinalStr = remov_inch+'00'; 
                  arr[3]=FinalStr;
              }
          }
        }
    }
  });
});

// SKU marketing functionality start
if(location.href.includes('sku')){
  let params = new URLSearchParams(document.location.search);
  let url_sku = params.get("sku"); 
  var loader = document.getElementById("loader");
  loader.style.display = "grid"; // hide the loader
  setTimeout( function skuMarketing() {
  if(url_sku.length == '17'){
    // Example URL ="https://capelrugs.com/products/creative-concepts?variant=41924583194804&sku=1990RS03000500726"
    let rec_base_market = url_sku.substr(0,4);
    let rec_color_market=  url_sku.substr(14,3);
    let returnID  = changeBase('select--base','active-fabric-base',rec_base_market);
    // function to change main image base 
    chnageBaseImg(returnID);
    let getBaseColorCode_Name = changeColor('base-fabric--slider','active-fabric',rec_color_market);
    // function to change main cornor images 
    changeCornerImg(rec_color_market,getBaseColorCode_Name);
     loader.style.display = "none";
  }
  else if (url_sku.length == '13') {
    let oct_stand_mar = url_sku.substr(0,4);
    let oct_color_mar= url_sku.substr(10,3);
    let OctReturn_Standard_ID  =changeBase('select--base','active-fabric-base', oct_stand_mar);
    chnageBaseImg(OctReturn_Standard_ID);
    let getOctaColorStandard_Name =changeColor('base-fabric--slider','active-fabric',oct_color_mar);
    changeCornerImg(oct_color_mar,getOctaColorStandard_Name);
  }
  else{
    // Example URL = "https://capelrugs.com/products/creative-concepts?variant=41924583915700&sku=2085GC429"
    let oct_base_market = url_sku.substr(0,4);
    let oct_color_market= url_sku.substr(6,3);
    let OctReturnID  =changeBase('select--base','active-fabric-base',oct_base_market);
    chnageBaseImg(OctReturnID);
    let getOctaColorCode_Name =changeColor('base-fabric--slider','active-fabric',oct_color_market);
    changeCornerImg(oct_color_market,getOctaColorCode_Name);
  }
  loader.style.display = "none";
  }, 1500);
}

// change the base variant image 
function changeBase(mainClass,imgClass,rec_base_market ){
  let var_base;
  let select_all_baseImg = selector(`.${mainClass} img`);
  select_all_baseImg.forEach( ele =>{
    let base_title =  ele.getAttribute('title').split('-')[0].trim();
    if(base_title == rec_base_market){
      ele.parentElement.querySelectorAll('img').forEach( el=>{
        el.classList.remove(`${imgClass}`);
      })
      let base_nam =  ele.getAttribute('title').split('-')[1].trim();
      selector('#style_number').innerHTML="Style: "+rec_base_market+' - '+base_nam;
       ele.classList.add(`${imgClass}`);
       var_base = ele.dataset.mediaId;
    }
  });
  return var_base;
}

// change the color variant image
function changeColor(mainClass,imgClass,oct_base_market ){
  let colorName;let fabric_N;
  let select_all_baseImg = selector(`.${mainClass} img`);
    select_all_baseImg.forEach( ele =>{
      let base_title =  ele.getAttribute('title').split('-')[0].trim();
      if(base_title == oct_base_market){
        ele.parentElement.querySelectorAll('img').forEach(el=>{
          el.classList.remove(`${imgClass}`);
          colorName = ele.getAttribute('title').split('-')[1].trim();
        });
        fabric_N = ele.getAttribute('data-img-name');
        selector('#fabric_name').innerHTML="Fabric: "+fabric_N;
        let get_col_nam = ele.getAttribute('title').split('-')[1].trim();
        selector('#color_number').innerHTML="Color: "+oct_base_market+' - '+get_col_nam;
         ele.classList.add(`${imgClass}`);
      }
    });
  return colorName;
}

// function to change main image base 
function chnageBaseImg(baseId) {
  let selectAllImages = selector(".flickity-slider > div");
  selectAllImages.forEach(ele =>{
  let image_id = ele.dataset.mediaId;
  if(image_id == baseId){
    selectAllImages.forEach(el=>{
      el.classList.remove('is-selected');
    });
    ele.classList.add("is-selected");
  }
  });
}
  
// function to change main cornor images 
function changeCornerImg(code,name) {
  let selectCorImage = selector('.product-gallery__fabric img');
  let img1 = selectCorImage[0].getAttribute('src');
  let img2 = selectCorImage[1].getAttribute('src');
  let finalName = name.replace(/ /g,'')+"_"+code;
  let firstHalfSrc = img1.split('/');
  let arrLastIndex = firstHalfSrc.slice(-1);
  let arrGetName = arrLastIndex[0].split('-');
  let FinalMyname = finalName+"-"+arrGetName[1];
  let fullSRC = firstHalfSrc[firstHalfSrc.length-1]=FinalMyname;
  //set main Corner view image
  selectCorImage[0].src = firstHalfSrc.join("/");
  // set full size corner view image 
  let Fin_string = firstHalfSrc.join("/");
  // selectCorImage[1].src = firstHalfSrc.join("/").replace('C','R');
  let lastChar = "C";
  let lastCharIndex = Fin_string.lastIndexOf(lastChar);
  if (lastCharIndex !== -1) {
  selectCorImage[1].src = Fin_string.slice(0, lastCharIndex) + "R" + Fin_string.slice(lastCharIndex + 1);
  }
}
/* End SKU marketing functionality start(Syed Code End ) */

//modal open and close
const modalButtons = document.querySelectorAll(".view--modal");
const modal = selector(".modal-popup");
modalButtons.forEach(function name(ee) {
ee.addEventListener("click", e => {
      const imgName = e.target.closest("[data-img-name]");
      selector(`.all-fabric--images`).style.display = 'flex';
      selector(".wrapper-img").setAttribute("data-visible", imgName)
      modal.classList.add("active");
  });
});

const closeModal = selector(".close--modal");
closeModal.addEventListener("click", () => {
  const activeModalImg = selector(".wrapper-img").dataset.visible;
  selector(`.all-fabric--images`).style.display = 'none';
  modal.classList.remove("active");
});

//add active image on main image
const mainImageActive = (id, event) => {
  const mainImage = selector(".product-gallery__carousel-item");
  mainImage.forEach(ele => {
      if (id === ele.dataset.mediaId) {
          (typeof selector(".product-gallery__carousel-item.is-selected") !== "undefined") ? selector(".product-gallery__carousel-item.is-selected").classList.remove("is-selected") : '';
          ele.classList.add("is-selected");
          selector("#fabric-base").value = event.target.dataset.image15Url;
      }
  });
}

//handle click event for base
  let selectBaseImages = selector(".select--base img");
  selectBaseImages.forEach((image)=>{
    image.addEventListener("click", event => {
      var title_S = event.target.getAttribute('title');
      var result_S = title_S.split('-');
      baseColorName = result_S[1];
      document.querySelector('#BaseCodeName').value = result_S[1];
        if (event.target.tagName === "IMG") {
            const activeBase = selector(".active-fabric-base");
            const selectedBaseNumber = event.target.getAttribute("title");
            selector("#style_number").innerHTML = `Style: ${selectedBaseNumber}`;
            let split_base = selectedBaseNumber.split("-");
            selector('.first_span').innerHTML=split_base[1];
            split_base.forEach(function (item, index) {
                if(index == '0'){
                    base_no =item;
                    arr[0]=base_no;
                }
            });
            (typeof activeBase !== "undefined") ? activeBase.classList.remove("active-fabric-base") : '';
            event.target.classList.add("active-fabric-base");
            const selectedView = selector(".changeView .activeView");
            if(selectedView.className.includes("full-size")){
                const mediaId = event.target.dataset.media30Id;
                mainImageActive(mediaId, event);
            }else{
                const mediaId = event.target.dataset.mediaId;
                mainImageActive(mediaId, event);
            }
        }
    });
  });

//handle fabric size click
selector(".select--size").addEventListener("click", event => {
  if (event.target.type === "button") {
      const activeSize = selector(".active-fabric-size");
      (typeof activeSize !== "undefined") ? activeSize.classList.remove("active-fabric-size") : '';
      event.target.parentElement.classList.add("active-fabric-size");
      selector("#fabric-size").value = event.target.value;
  }
});

// product gallery image Button -> [corner view, Full size view]
const imageViewHandle = (event) => {
  if (event.target.tagName === "BUTTON") {
      if (typeof selector(".activeView") !== "undefined") {
          selector(".activeView").removeAttribute("disabled");
          selector(".activeView").classList.remove("activeView");
      }
      selector(".product-gallery__carousel-wrapper").classList.toggle("product_views");
      selector(".loader-wrap").classList.toggle("full-views");
      event.target.classList.add("activeView");
      event.target.setAttribute("disabled", true);
      const selectedBase = selector(".custom-variant-select .active-fabric-base");
      if(event.target.className.includes("full-size")){
          const mediaId = selectedBase.dataset.media30Id;
          mainImageActive(mediaId, event);
      }
      else{
          const mediaId = selectedBase.dataset.mediaId;
          mainImageActive(mediaId, event);
      }
  }
}
selector(".changeView").addEventListener("click", e => {
  imageViewHandle(e);
  loaderMain();
});
}

//print product image when click on print button
const printButton = document.querySelector(".print-product");
printButton.addEventListener("click", () => {
  window.print();
});

/*-----------------custom variant code End here------------------*/

//variant code for calculating price
let price;
let prodData;
let carButton;
//return product json data 
const productJsonData = (id) => {
  const mainData = JSON.parse(selector(".product-custom-json").innerHTML);
  let returnItem = "";
    mainData.variants.forEach(item => {
      if (item.id === id) {
          returnItem = item;
      }
    });
  return returnItem;
}

//product page date availbility content
const availabiltyHandler = (id) => {
  const nextAvail = selector(".variantAvailability > p > #nextAvailability");
  const data = productJsonData(id);
  // nextAvail.innerHTML = data["metafields.global.availability"];
}

// for calculating square feet data through user input
const calculateSquareFeet = (id) => {
  const data = productJsonData(id);
  const mainDiv = selector("#product-custom-price");
  const other = selector(".product-for-other");
  const forRound = selector(".product-for-round");
  carButton = selector(".carButton");
  let propertyEle = selector(".property-ele");
  if (propertyEle) {
    propertyEle.remove();
  }
  selector("#size-availabel").innerText = data["metafields.global.SizeLimts"];
  if (data.option2 == 'Custom' && data.option1 == 'Round') {
    mainDiv.style.display = "block";
    forRound.style.display = "block";
    other.style.display = "none";
    carButton.style.display = "none";
  }
  else if (data.option2 == 'Custom' && data.option1 != 'Round') {
    mainDiv.style.display = "block";
    other.style.display = "block";
    forRound.style.display = "none";
    carButton.style.display = "none";
  }
  else {
    if (typeof selector("#size-prop") !== "undefined") {
        selector("#size-prop").remove();
    }
    mainDiv.style.display = "none";
    if(specialOrderCheck == 'false'){
      carButton.style.display = "block";
    }if(specialOrderCheck == 'true'){
      carButton.style.display = "none";
    }
  }
}

//Variant onLoad Function
function getSelectedVariantOnLoad() {
  let defaultVariant = selector(".uniq_card");
  variantId = defaultVariant.dataset.varient;
  prodData = productJsonData(+variantId);
  price = prodData.price / 100;
  availabiltyHandler(+variantId);
  calculateSquareFeet(+variantId);
}

//Variant changed event
document.addEventListener('variant:changed', function (event) {
  let variant = event.detail.variant;
  if (variant != null) {
    const id = variant.id;
    prodData = productJsonData(id);
    price = variant.price / 100;
    availabiltyHandler(id);
    calculateSquareFeet(id);
    ClearAllInput();
  }
});

if(selector(".calculate-button")){
  if(HandleName != 'creative-concepts'){
    selector(".product-form__add-button").setAttribute("disabled", true);
  }
}

if(selector("#WidInch")){
  selector("#WidInch").addEventListener('focus', function(event){
    selector(".product-form__add-button").setAttribute("disabled", true);
    selector(".product-form__add-button").style.display = "none";
  });
}

if(selector("#WidInch2")){
  selector("#WidInch2").addEventListener('focus', function(event){
    selector(".product-form__add-button").setAttribute("disabled", true);
    selector(".product-form__add-button").style.display = "none";
  });
}

if(selector("#LenInch")){
  selector("#LenInch").addEventListener('focus', function(event){
    selector(".product-form__add-button").setAttribute("disabled", true);
    selector(".product-form__add-button").style.display = "none";
  });
}
  
selector(".calculate-button").addEventListener("click", () => {
  /// initialize variables for validation
  let width = selector("#WidInch").value;
  let width2 = selector("#WidInch2").value;
  let length = selector("#LenInch").value;
  let squrefeet;
  let property;
  let matchTitle = "Round / Custom";
  let maxWidInch = prodData["metafields.global.WidLimit"];
  console.log(maxWidInch)
  let maxlenInch = prodData["metafields.global.LenLimit"];
  console.log(maxlenInch)
  // alert(maxWidInch+maxlenInch)
  /// getttting DOM  for Errror
  let wEror = selector("#wEror");
  let lEror = selector("#lEror");
  let w2Eror = selector("#w2Eror");
  let result = selector("#result");
  let result2 = selector("#result2");
  let Both = selector("#Both");
  /// getttting DOM  for Minimum
  let custlimitstxt = selector("[id=size-availabel]").innerHTML;
  let minwid = custlimitstxt.includes("Minimum");
  if(HandleName == 'creative-concepts'){
    let selectedShape = selector('.swatch-view-item[aria-checked="true"]').getAttribute('orig-value');
    selectedShape == 'Rectangle' ? validationMax(carButton, width, width2, length, squrefeet, property, matchTitle, maxWidInch, maxlenInch, wEror, lEror, w2Eror, result, result2, Both): 
    validateWidthOctagon(carButton, width, width2, squrefeet, property, matchTitle, maxWidInch, maxlenInch, wEror, lEror, w2Eror, result, result2, Both); 
  }else{
  if (minwid === true) {
    
    validationMin(carButton, width, length, squrefeet,
        property, wEror, lEror, result, Both);
  } else {
    validationMax(carButton, width, width2, length, squrefeet, property,
        matchTitle, maxWidInch, maxlenInch, wEror, lEror,
        w2Eror, result, result2, Both);
  }
  }
});

function validateWidthOctagon (carButton, width, width2, squrefeet, property,
matchTitle, maxWidInch, maxlenInch, wEror, lEror, w2Eror, result, result2, Both) {
  if (width == 0) {
  wEror.innerHTML = 'Invalid Or Zero Dimensions, Please enter gretter than current';
  result.textContent = '';
  Both.textContent = '';
  lEror.textContent = '';
  carButton.style.display = "none";
  ClearInput();
  } else {
  if (maxWidInch < width) {
    wEror.innerHTML = `Width must be <= ${maxWidInch}`;
    result.innerHTML = '';
    lEror.innerHTML = '';
    Both.innerHTML = '';
    carButton.style.display = "none";
    ClearInput();
  }
  else {
    squrefeet = CustomPricing(width, width);
    if(parseInt(squrefeet) > 0){
      result.innerHTML = `You may now add
      this to your cart. *Note: The Quantity
       will equal the Square footage shown above`;
      carButton.removeAttribute("disabled");
      carButton.style.display = "block";
      wEror.innerHTML = '';
      Both.innerHTML = '';
      lEror.innerHTML = '';
      carButton.removeAttribute("disabled");
      property = getProperty(width, width);
      Validation(squrefeet, property);
    }
    else{
      wEror.innerHTML = ``;
      result.innerHTML = '';
      lEror.innerHTML = '';
      Both.innerHTML = `Sq. ft. should be greater than 0`;
      carButton.style.display = "none";
      ClearInput();
    }
    
  }
  }
}

function validationMax(carButton, width, width2, length, squrefeet, property,
matchTitle, maxWidInch, maxlenInch, wEror, lEror, w2Eror, result, result2, Both) {
  if (prodData.title === matchTitle) {      /// validate for varient title        
    if (width2 == 0) {
        w2Eror.innerHTML = 'This field is Invalid';
        result2.innerHTML = '';
        Both.innerHTML = '';
        lEror.innerHTML = '';
        carButton.style.display = "none";
        ClearInput();
    }
    else {
        if (width2 > maxWidInch) {
            w2Eror.innerHTML = `Width must be <= ${maxWidInch}`;
            result2.innerHTML = '';
            carButton.style.display = "none";
            ClearInput();
        }
        else {
            squrefeet = CPforRound(width2);
            if(parseInt(squrefeet) > 0){
              w2Eror.innerHTML = '';
              result2.innerHTML = `You may now add
               this to your cart. *Note: The Quantity
                will equal the Square footage shown above`;
              carButton.style.display = "block";
              carButton.removeAttribute("disabled");
              property = getPropertyForRound(width2);
              Validation(squrefeet, property);
            }
            else{
              result2.innerHTML = '';
              w2Eror.innerHTML = 'Sq. ft. should be greater than 0';
              Both.innerHTML = '';
              carButton.style.display = "none";
              ClearInput();
            }
            
        }
    }
  } /// validate for varient title End
  else {
    /// validate for empty fields
    if (width == 0 && length == 0) {
        result.innerHTML = 'Invalid Or Zero Dimensions, Please Check and Then Re-Calculate';
        wEror.innerHTML = '';
        Both.innerHTML = '';
        lEror.innerHTML = '';
        carButton.style.display = "none";
        ClearInput();
    } else {
        if (width == 0) {
            wEror.innerHTML = 'This field is Invalid';
            result.innerHTML = '';
            Both.innerHTML = '';
            lEror.innerHTML = '';
            carButton.style.display = "none";
            ClearInput();
        }
        else if (length == 0) {
            lEror.innerHTML = 'This field is Invalid';
            wEror.innerHTML = '';
            Both.innerHTML = '';
            result.innerHTML = '';
            carButton.style.display = "none";
            ClearInput();
        }
        else {
            /// validate for fields
            if (maxWidInch < width && maxlenInch < length) {
                Both.innerHTML = `Length must be <= ${maxWidInch} & Width must be <= ${maxlenInch}.`;
                result.innerHTML = '';
                wEror.innerHTML = '';
                lEror.innerHTML = '';
                carButton.style.display = "none";
                ClearInput();
            }
            else {
                if (maxWidInch < width) {
                    wEror.innerHTML = `Width must be <= ${maxWidInch}`;
                    result.innerHTML = '';
                    lEror.innerHTML = '';
                    Both.innerHTML = '';
                    carButton.style.display = "none";
                    ClearInput();
                }
                else if (maxlenInch < length) {
                    lEror.innerHTML = `Length must be <= ${maxlenInch}`;
                    result.innerHTML = '';
                    wEror.innerHTML = '';
                    Both.innerHTML = '';
                    carButton.style.display = "none";
                    ClearInput();
                }
                else {
                  squrefeet = CustomPricing(width, length);
                  if(parseInt(squrefeet) > 0){
                    result.innerHTML = `You may now add
                    this to your cart. *Note: The Quantity
                     will equal the Square footage shown above`;
                    carButton.style.display = "block";
                    carButton.removeAttribute("disabled");
                    wEror.innerHTML = '';
                    Both.innerHTML = '';
                    lEror.innerHTML = '';
                    property = getProperty(width, length);
                    Validation(squrefeet, property)
                  }
                  else{
                    lEror.innerHTML = ``;
                    result.innerHTML = '';
                    wEror.innerHTML = '';
                    Both.innerHTML = 'Sq. ft. should be greater than 0';
                    carButton.style.display = "none";
                    ClearInput();
                  }
                    
                }
            }
            /// validate for fields End
        }
    }
    /// validate for empty fields End 
  }
}

function validationMin(carButton, width, length, squrefeet,
property, wEror, lEror, result, Both) {
/// validate for empty fields
if (width == 0 && length == 0) {
  result.innerHTML = 'Invalid Or Zero Dimensions, Please Check and Then Re-Calculate';
  wEror.innerHTML = '';
  Both.innerHTML = '';
  lEror.innerHTML = '';
  carButton.style.display = "none";
  ClearInput();
} else {
  if (width == 0) {
      wEror.innerHTML = 'This field is Invalid';
      result.innerHTML = '';
      Both.innerHTML = '';
      lEror.innerHTML = '';
      carButton.style.display = "none";
      ClearInput();
  }
  else if (length == 0) {
      lEror.innerHTML = 'This field is Invalid';
      wEror.innerHTML = '';
      Both.innerHTML = '';
      result.innerHTML = '';
      carButton.style.display = "none";
      ClearInput();
  }
  else {
      squrefeet = minCalculated(length, width);
      if (squrefeet < 15) {
          wEror.innerHTML = '';
          Both.innerHTML = '';
          lEror.innerHTML = '';
          result.innerHTML = 'Must Be At Least 15 Square Feet, Please Enter Valid Dimensions';
          selector("#SqFeetTot").value = squrefeet;
          selector("#CustPriceTot").value = 0;
          selector("[name=quantity]").value = 1;
          carButton.style.display = "none";
      }
      else {
          wEror.innerHTML = '';
          Both.innerHTML = '';
          lEror.innerHTML = '';
          result.innerHTML = `You may now add this to your cart. 
                      *Note: The Quantity will equal the Square footage shown above`;
          carButton.style.display = "block";
        carButton.removeAttribute("disabled");
          property = getProperty(width, length);
          Validation(squrefeet, property);
      }
  }
}
}
  
function minCalculated(len, wid) {
  let totalSqft = (parseInt(len) / 12) * (parseInt(wid) / 12);
  totalSqft = Number(Math.round(totalSqft + 'e1') + 'e-1');
  totalSqft = Math.round(totalSqft);
  return totalSqft;
}
  
function Validation(squrefeet, property) {
  let roundFeet = Math.round(squrefeet);
  let totalPrice = roundFeet * price;
  selector("#SqFeetTot").value = roundFeet;
  selector("#SqFeetTotR").value = roundFeet;
  selector("#CustPriceTot").value = `$${totalPrice}.00`;
  selector("#CustPriceTotR").value = `$${totalPrice}.00`;
  selector("[name=quantity]").value = roundFeet;
  let proEle = selector("#size-prop");
  if (proEle) {
    selector("#size-prop").value = property;
  } else {
    selector(".size_guide_wrapper").insertAdjacentHTML("afterend", `<input type='hidden' id='size-prop' name='properties[size]' value='${property}' >`)
  }
}
  
function ClearAllInput() {
  selector("#SqFeetTot").value = 0;
  selector("#SqFeetTotR").value = 0
  selector("#CustPriceTot").value = 0;
  selector("#CustPriceTotR").value = 0;
  selector("#WidInch2").value = 0;
  // selector("#WidInch").value = 0;
  selector("#LenInch").value = 0;
  selector("[name=quantity]").value = 1;
  result2.innerHTML = '';
  result.innerHTML = '';
}

function ClearInput() {
  selector("#SqFeetTot").value = 0;
  selector("#SqFeetTotR").value = 0
  selector("#CustPriceTot").value = 0;
  selector("#CustPriceTotR").value = 0;
  selector("[name=quantity]").value = 1;
}

function CustomPricing(width, length) {
  let SquareFeet = width * length / 144;
  return SquareFeet;
}

function CPforRound(wid) {
  let SqFeet = wid / 12;
  return SqFeet * SqFeet;
}

function getPropertyForRound(width) {
  let widthMin = Math.floor(parseInt(width) / 12);;
  let widthSec = parseInt(width % 12);
  let wMinZero = widthMin;
  let wSecZero = widthSec;
  if (widthMin < 10) { wMinZero = '0' + widthMin; }
  if (widthSec < 10) { wSecZero = '0' + widthSec; }
  if (widthMin.length == 1) { wMinZero = '0' + widthMin; }
  if (widthSec.length == 1) { wMinSec = '0' + widthSec; }
  let prop2 = wMinZero + '' + wSecZero;
  let prop1 = widthMin + "’" + widthSec + '"';
  let size = prop2 + ' / ' + prop1;
  return size;
}
  
function getProperty(width, length) {
  let widthMin = Math.floor(parseInt(width) / 12);
  let lengthMin = Math.floor(parseInt(length / 12));
  let widthSec = (parseInt(width) % 12);
  let lengthSec = (parseInt(length) % 12);
  //lengthSec=(lengthSec < 0) ? 0: lengthSec;
  let wMinZero = widthMin;
  let wSecZero = widthSec;
  let lMinZero = lengthMin;
  let lSecZero = lengthSec;
  if (widthMin < 10) { wMinZero = '0' + widthMin; }
  if (widthSec < 10) { wSecZero = '0' + widthSec; }
  if (lengthMin < 10) { lMinZero = '0' + lengthMin; }
  if (lengthSec < 10) { lSecZero = '0' + lengthSec; }
  if (widthMin.length == 1) { wMinZero = '0' + widthMin; }
  if (widthSec.length == 1) { wMinSec = '0' + widthSec; }
  if (lengthMin.length == 1) { lMinZero = '0' + lengthMin; }
  if (widthSec.length == 1) { lMinSec = '0' + lengthSec; }
  let prop2 = wMinZero + '' + wSecZero + '' + lMinZero + '' + lSecZero;
  let prop1 = widthMin + "’" + widthSec + '"x' + lengthMin + "’" + lengthSec + '"';
  let size = prop2 + ' / ' + prop1;
  return size;
}
getSelectedVariantOnLoad();

let reviewButton = selector(".stamped-badge");
  if (typeof reviewButton != "undefined") {
  reviewButton.addEventListener("click", () => {
    document.querySelectorAll(".card__collapsible-button")[0].click();
  })
}
// Click on add to cart button 
let btn_name = '';
selector(".product-form__add-button").addEventListener('click',function(){
let final_whole_sku = arr.toString().replace(/,/g, "");
  console.log(arr)
 
  if(location.href.includes('sku')){
  selector("#skus").value=url_sku;
  }else{
  selector("#skus").value=final_whole_sku;
  }
});
  
// Click On specialOrder_addToCartBtn 
document.querySelector('.specialOrder_addToCartBtn').addEventListener('click', function(e) {
  e.preventDefault();
  document.dispatchEvent(new CustomEvent('theme:loading:start'));
  let final_whole_sku_SpecialOrder = arr.toString().replace(/,/g, "").slice(0,-3) + 'SOF';
  // console.log(final_whole_sku_SpecialOrder)
  if(final_whole_sku_SpecialOrder.includes('RCSOF') || final_whole_sku_SpecialOrder.includes('GCSOF') ){
    alert('Special Order Custom Out Of Stock');
    document.dispatchEvent(new CustomEvent('theme:loading:end'));
  }else{
    specialOrder(final_whole_sku_SpecialOrder);
  }
});
})();