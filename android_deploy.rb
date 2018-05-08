#!/usr/bin/ruby

DEBUG = true
class Deployment
	@keystore_filepath = ''
	@project_name_apk = ''
	@project_name_keystore = ''

	def initialize
		abort unless version_changes_applied?
		abort unless keystore_file_exists?
		cordova_build_release
		move_apk_to_main_dir
		sign_with_jarsigner
		zipalign
	end

	def version_changes_applied?
		puts "Reminder: Did you make changes to version number in config.xml and package.json?"
		puts "[Y/n]"
		case gets.chomp
		when /[yY]/
			puts "Changes made" if DEBUG
			true
		else
			puts "Error: Do the changes now... closing the program"
			false
		end
	end

	def keystore_file_exists?
		if (!Dir.glob('./*.keystore').empty?)
			@keystore_filepath = Dir.glob('./*.keystore') # ["name.keystore"]
			@project_name = @keystore_filepath.to_s[4..-12]
			@project_name_apk = @project_name + '.apk' # name.apk
			@project_name_keystore = @project_name + '.keystore' # name.keystore
			puts "Keystore found: #{@keystore_filepath}" if DEBUG
			true
		else
			puts "Error: Keystore file not found in current directory... closing the program"
			false
		end
	end

	def cordova_build_release
		puts "Building the cordova project..."
		`cordova build --release android`
	end

	def move_apk_to_main_dir
		puts "Apk name: #{@project_name}" if DEBUG
		`mv ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./#{@project_name_apk}`
	end

	def sign_with_jarsigner
		puts "Signing with jarsigner..." if DEBUG
		if (`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore #{@project_name_keystore} #{@project_name_apk} #{@project_name}` == 0)
			puts "Signed" if DEBUG
		end
	end

	def zipalign
		'Zipaligning...' if DEBUG
		if (`zipalign 4 #{@project_name_apk} #{@project_name}SignedAligned.apk`)
			puts "Aligned" if DEBUG
		end
	end
end

deployment = Deployment.new
