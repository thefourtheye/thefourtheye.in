# Blog Setup Instructions

* Install Ruby
* `gem install bundler`
* `bundle install`
* `rake setup_github_pages`
* `cd _deploy`
* `git branch -m master temp`
* `git checkout master`
* `git branch -D temp`
* `cd ..`
* `rake clean`
* `rake generate`
* `rake preview`

