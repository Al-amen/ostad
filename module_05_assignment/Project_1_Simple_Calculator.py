def addition(a, b):
    return a + b

def subtraction(a, b):
    return a - b

def multiplication(a, b):
    return a * b

def division(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero not allowed"

def modulus(a, b):
    try:
        return a % b
    except ZeroDivisionError:
        return "Error: Division by zero not allowed"

def main():
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Modulus")
    
    try:
        operation = int(input("Enter choice (1/2/3/4/5): "))
        if operation not in (1, 2, 3, 4, 5):
            print("Invalid choice. Please select a valid operation.")
            return
        
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
    
    except ValueError:
        print("Invalid input. Please enter numeric values.")
        return
    
    if operation == 1:
        ans = addition(num1, num2)
        print(f"Addition: {num1} + {num2} = {ans}")
    
    elif operation == 2:
        ans = subtraction(num1, num2)
        print(f"Subtraction: {num1} - {num2} = {ans}")
    
    elif operation == 3:
        ans = multiplication(num1, num2)
        print(f"Multiplication: {num1} * {num2} = {ans}")
    
    elif operation == 4:
        ans = division(num1, num2)
        if isinstance(ans, str):
            print(ans)
        else:
            print(f"Division: {num1} / {num2} = {ans:.2f}")
    
    elif operation == 5:
        ans = modulus(num1, num2)
        if isinstance(ans, str):
            print(ans)
        else:
            print(f"Modulus: {num1} % {num2} = {ans}")

if __name__ == "__main__":
    main()
