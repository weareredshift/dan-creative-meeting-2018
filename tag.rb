usage = '''
Usage: ruby tag.rb [bump_type] [message]
- bump_type - One of "major", "minor", "patch". Determines how to increment the version number.
- message (opt) - Any enclosed string describing the release. If given, a commit will be saved changing the tag number in index.html, and that commit will be tagged. If no message is given, the last commit hash and next tag number will simply be logged.
Ex: ruby tag.rb patch "This fixes a bug"
'''

if ARGV[0]
  type = ARGV && ARGV[0].downcase
  message = ARGV[1]

  if ARGV.length < 1
    puts usage
  elsif !%w(major minor patch).include?(type)
    puts 'bump_type (first arg) must be one of "major", "minor", or "patch".'
  else
    puts "Pulling latest code and tags"
    `git pull && git fetch --tags` # Get most up-to-date code/tags

    puts "Determining latest tag"
    old_tag = `git describe --abbrev=0 --tags`.strip

    numbers = old_tag.split('v').last.split('.').map{ |n| n.to_i }
    place = ['major', 'minor', 'patch'].index(type)

    (place..numbers.length - 1).each do |n|
      if n === place
        numbers[n] = numbers[n] + 1
      else
        numbers[n] = 0
      end
    end

    new_tag = "v#{numbers.join('.')}"

    if message
      puts "Given message: '#{message}'"
    else
      puts "No commit or tag created"
    end

    puts "Old tag: '#{old_tag}'"
    puts "New tag: '#{new_tag}'"

    # Message given - update version in HTML, commit, and tag
    if message
      commit = `git rev-parse --short HEAD`
      `git tag #{new_tag} -m '#{message}' #{commit}`
      puts "Tagged change: #{commit}\n"

      puts "Pushing tags to remote"
      `git push --tags`
      puts "Push successful!"

      puts "Ready to deploy."

    # No message given - simply log out next tag and last commit hash
    else
      commit = `git rev-parse --short HEAD`
      puts "Last commit hash: #{commit}"
    end
  end
else
  puts usage
end
