 

var t=  '{"V_CIN":"G413825","VNom":"AIT OMAR","VPrenom":"EL MEHDI","VSexe":"M","V_DateNaiss":"26\/03\/1986","MntCredit":"2000"}' ;

var t2 ='{"V_CIN":"G413825","VNom":"AIT OMAR","VPrenom":"EL MEHDI","VSexe":"M","V_DateNaiss":"26/03/1986","MntCredit":"2000"}' ;

var t3 = '{"V_CIN":"G413825","VNom":"AIT OMAR","VPrenom":"EL MEHDI","VSexe":"M","V_DateNaiss":"26/03/1986","MntCredit":2000}';
    
    
   
var postData = JSON.stringify([
    {
      "V_CIN": "G413825",
      "VNom": "AIT OMAR",
      "VPrenom": "EL MEHDI",
      "VSexe": "M",
      "V_DateNaiss": "26/03/1986",
      "MntCredit": 2000
    }
  ]);
    
   
 

t3  = JSON.parse( t3 ) ;

t3  = JSON.stringify( postData ) ;

console.log(   t3    );