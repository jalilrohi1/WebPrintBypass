# python/gui.py
import tkinter as tk
from tkinter import messagebox
from generate_pdf import generate_pdf

def run_bypass():
    url = url_entry.get()
    output = output_entry.get()
    headless = headless_var.get()
    
    if not url or not output:
        messagebox.showerror("Error", "URL and output path are required!")
        return
    
    try:
        generate_pdf(url=url, output_path=output, headless=headless)
        messagebox.showinfo("Success", f"PDF saved to {output}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# GUI Setup
root = tk.Tk()
root.title("WebPrintBypass")

tk.Label(root, text="URL:").pack()
url_entry = tk.Entry(root, width=50)
url_entry.pack()

tk.Label(root, text="Output Path:").pack()
output_entry = tk.Entry(root, width=50)
output_entry.insert(0, "output.pdf")
output_entry.pack()

headless_var = tk.BooleanVar()
tk.Checkbutton(root, text="Headless Mode", variable=headless_var).pack()

tk.Button(root, text="Generate PDF", command=run_bypass).pack(pady=10)

root.mainloop()