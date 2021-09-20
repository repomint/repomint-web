## Flask

the app is hosted on heroku on https://mintsolana.herokuapp.com/

the index page is contains a form where you can add image url and number of stars

the APIish part examples:

https://mintsolana.herokuapp.com/mint?stars=1000

https://mintsolana.herokuapp.com/mint?stars=1000&r=0&g=250&b=250

## Files

Procfile is needed particularly for Heroku

wsgi.py starts the app on Heroku

app contains the templates -- html and potentially css -- as well as main that cntains python code

Generally, file names describe the items