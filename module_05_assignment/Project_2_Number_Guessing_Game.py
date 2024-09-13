import random

def guessNumber():
    
    print("Welcome to the Number Guessing Game!")
    print("Try to guess the number between 1 and 100.")
    
    secret_number = random.randint(0,100)
    attemps = 0
    
    while True :
        
        try:
            user_input = int(input("Enter your guess: "))
        except ValueError:
             print("Enter a numeric number")
             continue
        attemps += 1
         
        if user_input < secret_number:
            print("Too low!")
        elif user_input > secret_number:
            print("Too high!")
        else:
            print(f"Congratulations! You've guessed the number in {attemps} attempts.")
            break
            
            
    
       
if __name__ == "__main__":
    guessNumber()
     
  
    
    





