const DOMHandler = (function(tag){
    const element = document.querySelector(tag);
    return {
      load: function(module){
        element.innerHTML = module;
        colorOptionListener();
        deleteListener();
        hardDeleteListener();
        recoverListener();
      }
    }
})('#root')