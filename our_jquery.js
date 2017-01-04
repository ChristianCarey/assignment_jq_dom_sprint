Foo = function(name){
  this.name = name
  this.sayName = function(){
    console.log("My name is " + name)
  }
}

Bar = function(name){
  return {
  name: name,
  sayName: function(){
    console.log("My name is " + name)
  }
  }
}

Baz = function(name){
  if (!(this instanceof Baz)) return new Baz(name);
  this.name = name;
}

SimpleObject = function(collection){
  this.collection = collection
  this.each = function(funct, collection = this.collection){
    for(i = 0; i < collection.length; i++){
      funct(collection[i], i)
    }

  }

}

var jQuery = function(param){
  // var first_char = param[0],
  //     response;
  var response;
  if (param instanceof Object) {
    response = [param]
  } else {
    response = Array.prototype.slice.call( document.querySelectorAll(param) );
  }

  // else{  
  //   if (first_char === ".") {
  //     var htmlCollection = document.getElementsByClassName(param.slice(1));
  //     response = Array.prototype.slice.call( htmlCollection );
  //   } else if (first_char === "#") {
  //     response = [document.getElementById(param.slice(1))];
  //   } else {
  //     var htmlCollection = document.getElementsByTagName(param);
  //     response = Array.prototype.slice.call( htmlCollection );
  //   }

  // }
  return new jQueryObject(response, param);
}

function jQueryObject(collection, param){
  this.param = param 

  this.collection = collection;
  this.each = function(funct){
    for(i = 0; i < this.collection.length; i++){
      funct(this.collection[i], i);
    }
  };
  this.length = function(){
    return this.collection.length;
  };
  this.eq = function(index){
    return new jQueryObject([this.collection[index]], this.param);
  };

  this.idx = function(index){
    return collection[index];
  };

  this.hasClass = function(className){
    var response = false;
    this.each(function(node){
      if (helper.hasClass(node, className)){
        response = true
        return true
      }
    });
    return response;
  };


  this.addClass = function(className){
    this.each(function(node){
      node.className += " " + className;
    });
    return this
  };

  this.removeClass = function(className){
    this.each(function(node){
      node.classList.remove(className);
    });
    return this
  };

  this.toggleClass = function(className){
    this.each(function(node){
      if(helper.hasClass(node, className)){
        helper.removeClass(node, className)
      }
      else{
        helper.addClass(node, className)
      }
    });
  };

  this.val = function(value){
    if(arguments.length > 0){
      this.each(function(node){
        node.value = value;
      });
    }
    else{
      return this.idx(0).value;
    } 
  };

  this.css = function(propName, value){
    if(arguments.length < 2){
      return this.collection[0].style[propName];
    } else {
      this.each(function(node){
        if(value[0] === "+"){
          var adding = parseInt(value.slice(2))
          var original = window.getComputedStyle(node)[propName]
          var total = adding + parseInt(original.slice(0,original.length-2)) + "px"
          if(original){
            node.style[propName] = total
          }
          else{
            node.style[propName] = adding + "px"
          }
        }
        else if(value[0] === "-"){
          var subtracting = parseInt(value.slice(2))
          var original = window.getComputedStyle(node)[propName]
          var total = parseInt(original.slice(0,original.length-2)) - subtracting + "px"
          if(original){
            node.style[propName] = total
          }
          else{
            node.style[propName] = subtracting + "px"
          }
        }else{
          node.style[propName] = value;
        }

      });
    }
   
    return this
  };

  this.height = function(value){
    if (arguments.length > 0){
      this.css('height', value + "px");
    } else {
      string = this.css('height');
      return string.substring(0, string.length - 2);
    }
  };

  this.width = function(value){
    if (arguments.length > 0){
      this.css('width', value + "px");
    } else {
      string = this.css('width');
      return string.substring(0, string.length - 2);
    }
  };

  this.attr = function(attrName, value){
    if (arguments.length < 2){
      return this.collection[0].getAttribute(attrName);
    } else {
      this.each(function(node){
        node.setAttribute(attrName, value);
      });
    }
  };

  this.html = function(value){
    if (arguments.length < 1){
      return this.collection[0].innerHTML
    }
    else{
      this.each(function(node){
        node.innerHTML = value;
      })
    }

  };

  this.children = function(){
    var newParam = this.param + "> *"
    console.log($(newParam))
    return $(newParam)
  }

  this.append = function(value){
    this.each(function(node){
      node.innerHTML += value
    })
  };

  this.replaceWith = function(value){
    this.each(function(node){
      node.outerHTML = value
    })
  };

  this.filter = function(selector){
    
  }
}

var helper = {
  
  hasClass: function(node, className){
    response = false
    node.classList.forEach(function(klass){
        if (klass === className) {
          response = true;
          return true
        }
    });
    return response
  }, 

  addClass: function(node, className){
      node.className += " " + className;
      
  },

  removeClass: function(node, className){
      node.classList.remove(className);
  }
}
var $ = jQuery;

var info_list_items = ["Make all sad classes into happy ones.",
"Make the annoying popup link point instead to http://www.cashcats.biz.",
"Change the positioning of the annoying popup so it is on the right side of the screen (it's okay to use direct CSS here). Make it 30 pixels lower than its current position by utilizing its current top value.",
"Replace the ellipsis ... in one of the suggested topics with content of your choice -- but do so by traversing from a different element.",
"Replace the form input with a &lt; textarea &gt; instead of a &lt; input type=\"text\" &gt; ."]

  $('h1').html("Some thing cheeky.");
  $('.info-box').append('<ul id="info-ul">');
  info_list_items.forEach(function(list_item){
    $('#info-ul').append("<li>" + list_item + "</li>");
  });
  $('.sad').addClass("happy").removeClass("sad");
  $('#annoying-popup a').attr('href', "http://www.cashcats.biz.");
  $('#annoying-popup').css("right", "0" ).css("top", "+=10")
  $('.suggested-topics').children().eq(1).children().eq(6).html("This is a value")
  $('.input-form input[type=text]').replaceWith("<textarea>");