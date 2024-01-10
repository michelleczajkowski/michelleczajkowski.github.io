import time
import winsound

def main():
    while True:
        goals = input("Enter your goals: ")
        minutes = int(input("Enter the number of minutes: "))
        start_time = time.time()
        input("Press Enter to start the timer...")
        
        # Wait for the specified number of minutes
        time.sleep(minutes * 60)
        
        # Beep sound
        winsound.Beep(1000, 1000)
        
        print("Your goals: " + goals)
        answer = input("Did you achieve your goals? (yes/somewhat/no): ")
        
        notes = input("Notes (max 100 words): ")
        if len(notes) > 100:
            print("Notes exceed 100 words. Truncating...")
            notes = notes[:100]
        
        with open("log.txt", "a") as log_file:
            log_file.write(f"Time: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            log_file.write(f"Minutes: {minutes}\n")
            log_file.write(f"Goals: {goals}\n")
            log_file.write(f"Answer: {answer}\n")
            log_file.write(f"Notes: {notes}\n")
            log_file.write("\n")
        
        continue_logging = input("Continue? (yes/no): ")
        if continue_logging.lower() != 'yes':
            print("Logging completed. Goodbye!")
            break

if __name__ == "__main":
    main()
