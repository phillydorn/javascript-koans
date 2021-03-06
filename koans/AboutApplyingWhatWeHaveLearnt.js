var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];


      /* solve using filter() & all() / any() */

      var nutlessProducts = _(products).filter(function (x) {return x.containsNuts === false});
      var noMushrooms = function (x) {return x!=="mushrooms"};

      for (var i=0; i<nutlessProducts.length; i++) {
        if _(nutlessProducts[i].ingredients).all(noMushrooms) {
          productsICanEat.push(nutlessProducts[i]);
        }
      }

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var nums = _.range(1000);
    
    var sum = _(nums).reduce(function(memo,x){
        if (x % 3===0 || x % 5 ===0) {
          return memo+x;
        }
        else {return memo}


    },0
  );

     /* try chaining range() and reduce() */
     /*I couldn't figure out how to chain the range() function because it doesn't take an array argument */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var result = _(products).chain()
              .map(function(product) {return product.ingredients})
              .flatten()
              .reduce(function(memo,x){
                if (x === "mushrooms") {
                  memo++;

                }
                return memo;
              }, 0)
              .value();
    ingredientCount["mushrooms"] = result;

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function (compNum) {
        var largestPrime = 1;
        var isPrime;
        for (var i = 2; i<=compNum/2; i++) {
          if (compNum % i === 0)//checks if i is a factor of compNum
          {
            
            isPrime = true;
            for (var j=2; j<=i/2; j++) // checks to see if i is prime
            {
              if (i % j ===0)
              {
                isPrime = false;
              }

            }
            if (isPrime)
              {
                largestPrime=i;
              }
        
        }
      }
  return largestPrime;
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
        var product, largePalindrome, productString, productReverse;

        for (var i = 100; i < 1000; i++){
          for (var j = i; j < 1000; j++) {
              product = (i * j)
              productString = product.toString();
              productReverse = "";

              for (var k = productString.length-1; k >=0; k --) {//goes over each character of the string to reverse it
                  productReverse = productReverse +  productString[k];
                  
              }
            
                if (productString === productReverse) {
                largePalindrome = product;
              }
            }
          }
          return largePalindrome;


    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    var isDivisible = true,
        smallNum = 20;

      do {
        isDivisible = true;
        smallNum++;
        for (var i = 1; i <=20; i++) {
          if (smallNum % i !== 0) {
            isDivisible = false;
          }
        
        }
      
      
      } while (!isDivisible);

      return smallNum;

  });

  it("should find the difference between the sum of the squares and the square of the sums", function (num1, num2) {
    
      var sumOfSquares, squareOfSums, difference;

      sumOfSquares = num1*num1 + num2*num2;
      squareOfSums = (num1 + num2) * (num1+ num2);

      difference = Math.abs(sumOfSquares-squareOfSums);

      return difference;
  });

  it("should find the 10001st prime", function () {

    var numberOfPrimes = 0,
        number = 1,
        isPrime = true;

    while (numberOfPrimes <10001) {
      number ++;
      isPrime = true;

        for (var i=2; i<=number/2; i++) // checks to see if number is prime
            {
              if (number % i===0)
              {
                isPrime = false;
              }

            }
        if (isPrime) {
          numberOfPrimes ++;
        }
    

    }
    return number;

  });
  
});
