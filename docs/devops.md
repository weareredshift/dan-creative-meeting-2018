## Automated deployments to S3 using CircleCI

- Create a new user on AWS specifically for CircleCI (IMPORTANT for security reasons)
- Only give them write access to S3 using the `s3:PutObject` policy action
- Obtain the `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` for this user
- Add these keys to CircleCI under the repo's "Permissions" >> "AWS Permissions" section
![screen shot 2018-01-17 at 4 26 25 pm](https://user-images.githubusercontent.com/11274285/35074578-69dca798-fba3-11e7-909c-d6ab677dac75.png)
- Be sure to also add your target `BUCKET_NAME` to the appropriate env variables (ex: `$STAGING_BUCKET`)

Once these steps have been completed, commits merged into the `staging` and `master` branches should trigger deployments to the specified S3 bucket.