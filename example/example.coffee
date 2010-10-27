# App to open public/index.html through httṕ:// instead of file://
# Static files in public/ are served by default

get '/using-zappa': -> redirect 'http://github.com/mauricemach/zappa'
