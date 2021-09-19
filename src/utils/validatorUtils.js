'use strict';

module.exports = class validatorUtils {

   static removeHmltFormat(text) {
      text = text.replace(/\n/g,'');
      text = text.replace('R$&nbsp;','');
      text = text.replace('R$','');
      text = text.replace('R$ ','');
      text = text.replace(/<.*?>/g, ' ');
      
      while (text.indexOf('  ') > 0){
         text = text.replace('  ', ' ');
      }     
      
      return text     
   }

   static validaURL(url) {
      if (url == undefined){
         return true
      } else {
         return false 
      }         
   }

   static validaURLOrigem(url) {
      if ((url.indexOf('amazon.com.br') > 0) || (url.indexOf('zattini.com.br') > 0) || (url.indexOf('saraiva.com.br') > 0)){
         return false
      } else {
         return true
      }  
   }
}