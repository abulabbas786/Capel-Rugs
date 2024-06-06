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

(function () {
    //global selector 
    let sku_no='';
    let base_no=';'
    let Fab_result="";
    let shape_result="";
    let arr = ['2009','R','S','24003600','394'];
    let FinalStr='';
    const selector = (element) => {
        const query = document.querySelectorAll(element);
        let ele = "";
        (query.length > 1) ? ele = query : ele = query[0];
        // console.log(ele)
        return ele;
    }

    //reload based show description like- style, color, fabric
    // const baseNumber = selector("[data-first-base]").getAttribute("data-first-base");
    // const colorNumber = selector("[data-colornumber]").getAttribute("data-colornumber");
  if(location.href.includes('products/copy-of-creative-concepts1')){
    const baseNumber = document.querySelector("[data-first-base] img").getAttribute("title");
    const colorNumber = selector("img.active-fabric").title;
    const fabricName = selector("[data-img-name]")[0].getAttribute("data-img-name");
    selector("#style_number").innerHTML = `Style: ${baseNumber}`;
    selector("#color_number").innerHTML = `Color: ${colorNumber}`;
    selector("#fabric_name").innerHTML = `Fabric: ${fabricName}`;
  }
    /*------------custom variant code start here----------*/

    //show image preview on main image left side
    const productTemp = selector(".custom-product--template");
    if (productTemp?.getAttribute("data-template") === "product.creative") {

        const imageHandler = (src, borderSrc) => {
            const propertyImg = selector("#imageChange");
            const previewImgs = selector(".preview-gallery-img");
            const fabricBorder = selector(".product-gallery__fabric");
            previewImgs.forEach(previewImg => {
                previewImg.remove()
            })
            fabricBorder.innerHTML = `<img class="preview-gallery-img corner-gallery-img" src=${src} />
            <img class="preview-gallery-img border-gallery-img" src=${borderSrc} />`;
            propertyImg.value = src;
        }

        //handle fabric active image
        const fabricImageHandler = () => {
            const imgPreview = selector(".image-preview");
            (typeof imgPreview != "undefined") ? imgPreview.remove() : '';
            const activeFabric = selector(".active-fabric");
            (typeof activeFabric != "undefined") ? activeFabric.classList.remove("active-fabric") : '';
        }

        //handle click event for fabric
        selector(".select--fabric").forEach(ele => {
            ele.addEventListener("click", event => {
                if (event.target.tagName === "IMG") {
                    fabricImageHandler();
                    selector(".product_type_data span").innerHTML = event.target.dataset.productType;
                    selector("#color_number").innerHTML = `Color: ${event.target.dataset.styleNumber}`;
                    selector("#fabric_name").innerHTML = `Fabric: ${event.target.closest("[data-img-name]").dataset.imgName}`;
                    event.target.classList.add("active-fabric");
                    const src = event.target.src;
                    (typeof src !== "undefined") ? imageHandler(src, event.target.dataset.borderSrc) : '';
                    arr[4]=event.target.dataset.code;
                    console.log(arr);
                }
            });
        })

        //handle change shape(Rectangle & Octagon) event
        selector(".selector_rec_oct").forEach(ele => {
        ele.addEventListener("change",event =>{
            if(event.target.dataset.optionPosition == '1'){
                if( event.target.value == 'Octagon'){
                    arr[1]="G";
                console.log(arr);
                }
                else{
                    arr[1]="R"
                console.log(arr)
                }
            }else{
                if(event.target.value == 'Custom'){
                    arr[2]="C";
                    arr[3]='';
                    console.log(arr)
                }else{
                    arr[2]="S";
                    console.log(event.target.value); 
                   let inch_value= event.target.value;
                   let remov_inch = inch_value.split("'").join("");
                   let remov_inch2= inch_value.replace(/['"]+/g,'');
                   if(inch_value.includes("x")){
                        const digitCount = inch_value.replace(/[^0-9]/g, "").length;
                        console.log(digitCount); 
                        if(digitCount == '4'){
                           var first_2=  remov_inch2.slice(0, 2);
                           var last_2= remov_inch2.slice(-2);
                           FinalStr = '00'+first_2+'00'+last_2; 
                           arr[3]=FinalStr;
                           console.log(arr);
                        }
                        if(digitCount == '2'){
                           var first_1=  remov_inch2.slice(0, 1);
                           var last_1= remov_inch2.slice(-1);
                           FinalStr = '0'+first_1+'00'+'0'+last_1+"00"; 
                           arr[3]=FinalStr;
                           console.log(arr);
                        }
                        if(digitCount == '3'){
                           var first_one=  remov_inch2.slice(0, 1);
                           var last_two= remov_inch2.slice(-2);
                           FinalStr = '0'+first_one+'00'+last_two+"00"; 
                           arr[3]=FinalStr;
                           console.log(arr);
                        }
                   }else{
                        const digitCount = inch_value.replace(/[^0-9]/g, "").length;
                        if(digitCount == '1'){ 
                            FinalStr = '0'+remov_inch+'00'; 
                            arr[3]=FinalStr;
                            console.log(arr);
                        }else{
                            FinalStr = remov_inch+'00'; 
                            arr[3]=FinalStr;
                            console.log(arr);
                        }
                    }
                }
            }
        });
        })


        //modal open and close
        const modalButtons = selector(".view--modal");
        const modal = selector(".modal-popup");
        modalButtons.forEach(button => {
            button.addEventListener("click", e => {
                const imgName = e.target.closest("[data-img-name]").dataset.imgName;
                selector(`.all-fabric--images[data-img-name=${imgName}]`).style.display = 'flex';
                selector(".wrapper-img").setAttribute("data-visible", imgName)
                modal.classList.add("active");
            });
        });

        const closeModal = selector(".close--modal");
        closeModal.addEventListener("click", () => {
            const activeModalImg = selector(".wrapper-img").dataset.visible;
            selector(`.all-fabric--images[data-img-name=${activeModalImg}]`).style.display = 'none';
            modal.classList.remove("active");
        })

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
        selector(".select--base").addEventListener("click", event => {
            if (event.target.tagName === "IMG") {
                const activeBase = selector(".active-fabric-base");
                const selectedBaseNumber = event.target.getAttribute("title");
                selector("#style_number").innerHTML = `Style: ${selectedBaseNumber}`;
                let split_base = selectedBaseNumber.split("-");
                split_base.forEach(function (item, index) {
                    if(index == '0'){
                        base_no =item;
                        arr[0]=base_no;
                        console.log(arr);
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
        });

        //print product image when click on print button
        const printButton = document.querySelector(".print-product");
        printButton.addEventListener("click", () => {
            window.print();
        });

       

    }

    /*-----------------End here------------------*/

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
        nextAvail.innerHTML = data["metafields.global.availability"];
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
            carButton.style.display = "block";
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

    selector(".calculate-button").addEventListener("click", () => {
        /// initialize variables for validation
        let width = selector("#WidInch").value;
        let width2 = selector("#WidInch2").value;
        let length = selector("#LenInch").value;
        let squrefeet;
        let property;
        let matchTitle = "Round / Custom";
        let maxWidInch = prodData["metafields.global.WidLimit"];
        let maxlenInch = prodData["metafields.global.LenLimit"];
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
        if (minwid === true) {
            validationMin(carButton, width, length, squrefeet,
                property, wEror, lEror, result, Both);
        } else {
            validationMax(carButton, width, width2, length, squrefeet, property,
                matchTitle, maxWidInch, maxlenInch, wEror, lEror,
                w2Eror, result, result2, Both);
        }
    });

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
                    w2Eror.innerHTML = '';
                    result2.innerHTML = `You may now add
                     this to your cart. *Note: The Quantity
                      will equal the Square footage shown above`;
                    carButton.style.display = "block";
                    squrefeet = CPforRound(width2);
                    property = getPropertyForRound(width2);
                    Validation(squrefeet, property);
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
                            result.innerHTML = `You may now add
                            this to your cart. *Note: The Quantity
                             will equal the Square footage shown above`;
                            carButton.style.display = "block";
                            wEror.innerHTML = '';
                            Both.innerHTML = '';
                            lEror.innerHTML = '';
                            squrefeet = CustomPricing(width, length);
                            property = getProperty(width, length);
                            Validation(squrefeet, property)
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
            // let div = document.createElement("div");
            // div.id = "property-ele";
            // div.style = "display:none";
            // div.innerHTML = `<input id='size-prop' name='properties[size]' value='${property}' >`;
            // let referenceNode = selector("#product-custom-price");
            // referenceNode.appendChild(div);
            selector(".size_guide_wrapper").insertAdjacentHTML("afterend", `<input type='hidden' id='size-prop' name='properties[Custom Size]' value='${property}' >`)
        }
    }
    function ClearAllInput() {
        selector("#SqFeetTot").value = 0;
        selector("#SqFeetTotR").value = 0
        selector("#CustPriceTot").value = 0;
        selector("#CustPriceTotR").value = 0;
        selector("#WidInch2").value = 0;
        selector("#WidInch").value = 0;
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
        // console.log(widthMin,lengthMin);
        let widthSec = (parseInt(width) % 12);
        let lengthSec = (parseInt(length) % 12);

        //lengthSec=(lengthSec < 0) ? 0: lengthSec;
        // console.log(widthSec,lengthSec);
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
    selector(".product-form__add-button").addEventListener('click',function(){
        console.log(arr);
        let final_whole_sku = arr.toString().replace(/,/g, "");
        console.log(final_whole_sku);
        selector("#skus").value=final_whole_sku;
    });
    
})();


