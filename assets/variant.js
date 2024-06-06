document.addEventListener('variant:changed', function(event) {
    var variant = event.detail.variant; // Gives you access to the whole variant details
    let variantId = variant.id;
    document.querySelectorAll('.variantToShowOnChange span').forEach((e) => {
      let variantIdSpan = e.dataset.id;
      console.log(e.innerHTML)
      if(variantId == variantIdSpan ){
        document.querySelector('#nextAvailability').innerHTML = e.innerHTML;
      }
    });
});