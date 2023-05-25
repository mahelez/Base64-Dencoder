/* 

Code from https://base64.io/

*/



(function(){
        
    function b64EncodeUnicode(str) {
       return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
           return String.fromCharCode('0x' + p1);
       }));
    } 
    
    function b64DecodeUnicode(str) {
       return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));
    } 
    
    var enc = document.getElementById("encode");
    var dec = document.getElementById("decode");
    var encGroup = enc.parentElement;
    var decGroup = dec.parentElement;
          
    dec.addEventListener('input', function(){
       try {
         decGroup.classList.remove('has-error');
         enc.value = b64DecodeUnicode(dec.value);
       } catch (e) {
         console.log('Unable to decode as UTF-8 string!');
         try {
           enc.value = atob(dec.value);
         } catch(ee) {
           console.log(ee);
           console.log('Invalid base64 string!');
           decGroup.classList.add('has-error');
         }
       }
    }, false);
    
    enc.addEventListener('input', function(){
        decGroup.classList.remove('has-error');
        dec.value = b64EncodeUnicode(enc.value);
    }, false);
    
})();