from selenium import webdriver
import base64
import os
from time import sleep

def get_img(msg):
	chrome_options = webdriver.ChromeOptions()

	chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
	chrome_options.add_argument('--disable-dev-shm-usage')
	chrome_options.add_argument('--no-sandbox')
	chrome_options.add_argument("--headless")
	chrome_options.add_argument('window-size=2560x1440')
	driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

	driver.maximize_window()

	base64_string = base64.b64encode(msg.encode("ascii"))
	base64_string = base64_string.decode("ascii").replace("+", "%2B")

	driver.get(f"https://ray.so/?code={base64_string}&background=true&darkMode=true&colors=breeze&padding=64&title=Code&language=javascript")

	driver.execute_script("""
	document.querySelector('section.controls').remove();
	document.body.style.webkitTransform = 'scale(1.5)';
	""")

	sleep(3)
	ret = driver.find_element_by_class_name("drag-control-points").screenshot_as_png
	sleep(4)
	driver.quit()
	return ret
