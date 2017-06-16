import {
  module,
  test
} from 'ember-qunit';

import patchSplitter from 'rails-diff/utils/patch-splitter';

module('patchSplitter');

var patch = "diff -ur generated/v3.1.1/Gemfile generated/v3.2.6/Gemfile\nindex 0a5b233..0ace91f 100644\n--- a/Gemfile\n+++ b/Gemfile\n@@ -1,9 +1,9 @@\n-source 'http://rubygems.org'\n+source 'https://rubygems.org'\n-gem 'rails', '3.1.2'\n+gem 'rails', '3.2.6'\n@@ -11,8 +11,12 @@ gem 'sqlite3'\n-  gem 'sass-rails',   '~> 3.1.5.rc.2'\n-  gem 'coffee-rails', '~> 3.1.1'\n+  gem 'sass-rails',   '~> 3.2.3'\n+  gem 'coffee-rails', '~> 3.2.1'\ndiff -ur generated/v3.1.1/config/routes.rb generated/v3.2.6/config/routes.rb\nindex 2c8e7db..f01137d 100644\n--- a/config/routes.rb\n+++ b/config/routes.rb\n@@ -54,5 +54,5 @@ App::Application.routes.draw do\n-  # match ':controller(/:action(/:id(.:format)))'\n+  # match ':controller(/:action(/:id))(.:format)'";

test('returns array', function(assert) {
  var result = patchSplitter("");
  assert.ok(result instanceof Array);
});

test('sets file paths', function(assert) {
  var result = patchSplitter(patch),
      paths = result.mapBy("filePath");

  assert.deepEqual(paths, ["Gemfile", "config/routes.rb"]);
});
