# push-notifications

Once you clone the project follow the following steps ---- 

1. run command npm install or yarn .
2. Go to android folder in your root directory. (cd android) and create a file name local.properties and paste your sdk path inside it.
   this process can also be achieved by running your android folder in android studio.
3. Run command npx react-native run-android to start your project locally.
4. In the console of metro bundler you will have fcm token related to the testing/running device. Copy that and paste it in firebase       cloud messaging sectiion from where we send notification. 
5. You will receive notification in background and foreground.