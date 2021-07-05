from selenium import webdriver
import base64
import os

GECKODRIVER_PATH = os.environ.get("GECKODRIVER_PATH")
FIREFOX_PATH = os.environ.get("FIREFOX_PATH")

def get_img(msg):
	options = webdriver.FirefoxOptions()
	options.binary_location = FIREFOX_PATH
	options.add_argument('--headless')

	driver = webdriver.Firefox(executable_path=GECKODRIVER_PATH, options=options, service_log_path="/dev/null")
	driver.maximize_window()

	base64_string = base64.b64encode(msg.encode("ascii"))
	base64_string = base64_string.decode("ascii").replace("+", "%2B")

	driver.get(f"https://ray.so/?code={base64_string}&background=true&darkMode=true&colors=breeze&padding=64&title=Code&language=javascript")

	driver.execute_script("""
	document.querySelector('section.controls').remove();
	document.body.style.webkitTransform = 'scale(1.5)';
	""")

	ret = driver.find_element_by_class_name("drag-control-points").screenshot_as_png
	driver.quit()
	return ret
