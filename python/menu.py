import inquirer
import subprocess
import sys

def run_populate():
    print("\nRunning populate_db.py...\n")
    result = subprocess.run(
        [sys.executable, "populate_db.py"],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.stderr:
        print("Errors:", result.stderr)

def run_other():
    print("\nOther script placeholder\n")

def main():
    questions = [
        inquirer.List(
            "choice",
            message="PYTHON > Select script",
            choices=["Populate DB", "Other", "Exit"],
        )
    ]
    while True:
        answer = inquirer.prompt(questions)
        if not answer:
            break
        choice = answer["choice"]
        if choice == "Populate DB":
            run_populate()
        elif choice == "Other":
            run_other()
        else:
            print("Exiting.")
            break

if __name__ == "__main__":
    main()
