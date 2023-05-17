pipeline {
  agent {
    label "master"
  }
  options {
    timeout(15) 
  }
  
  triggers {
    githubPush()
  }
  
  environment {
    SERVICE_NAME = "mfl-fe"
    DIST_DIR = "build"
    DEV_IP = "dev.mathfactlab.com"
    STAGE_IP = "staging.mathfactlab.com"
    PREPROD_IP = "preprod.mathfactlab.com"
    SSH_AGENT = "mifa-california-ssh"
    ARTIFACT_NAME = "${env.SERVICE_NAME}-${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    EMAIL_TO_SEND_CC_DEV = "nikunjmavani.albetrios@gmail.com"
    EMAIL_TO_SEND_CC_PROD = "nikunjmavani.albetrios@gmail.com"
  }
  
  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:12.16'
        }
      }
      steps {
        script {
          withAWS(region:'us-west-1', credentials:'jenkins-mathfactlabs') {
            s3Download(file:'.env', bucket:'env.mathfactlabs', path:"mfl-fe/${env.BRANCH_NAME}/.env", force:true)
          }
          sh 'npm -v'
          sh 'node -v'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Package') {
      agent {
        docker {
          image 'node:12.16'
        }
      }
      steps {
        script {
          if (env.BRANCH_NAME == 'development' || env.BRANCH_NAME == 'staging' || env.BRANCH_NAME == 'preprod') {
            dir("${env.DIST_DIR}") {
                sh "tar -czf ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ."
            }
          }
        }
      }
    }

    stage('Prod Deploy'){
      agent {
        docker {
          image 'node:12.16'
        }
      }
      steps{
          script {
            if (env.BRANCH_NAME == 'main') {
              withAWS(region:'us-west-2',credentials:'jenkins-mathfactlabs'){
                  s3Upload(file:'build', bucket:'mathfactlab-prod-app', path:'')
                  cfInvalidate(distribution:'ETSDXUAOER9CW', paths:['/*'], waitForCompletion: false)
              }        
            }
          }
      }
    }

    stage('Deploy'){
      agent {
        docker {
          image 'node:12.16'
        }
      }
      steps{
        script {
          if (env.BRANCH_NAME == 'development') {
            sshagent(["${SSH_AGENT}"]) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${DEV_IP} 'bash -s' < ./pre-deploy.sh ${env.SERVICE_NAME}"
              sh "scp -o StrictHostKeyChecking=no ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ubuntu@${DEV_IP}:/home/ubuntu/.tmp/builds/${env.SERVICE_NAME}"
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${DEV_IP} 'bash -s' < ./deploy.sh ${env.SERVICE_NAME} ${env.ARTIFACT_NAME}"
            }
          }
          if (env.BRANCH_NAME == 'staging') {
            sshagent(["${SSH_AGENT}"]) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_IP} 'bash -s' < ./pre-deploy.sh ${env.SERVICE_NAME}"
              sh "scp -o StrictHostKeyChecking=no ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ubuntu@${STAGE_IP}:/home/ubuntu/.tmp/builds/${env.SERVICE_NAME}"
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_IP} 'bash -s' < ./deploy.sh ${env.SERVICE_NAME} ${env.ARTIFACT_NAME}"
            }
          }
          if (env.BRANCH_NAME == 'preprod') {
            sshagent(["${SSH_AGENT}"]) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${PREPROD_IP} 'bash -s' < ./pre-deploy.sh ${env.SERVICE_NAME}"
              sh "scp -o StrictHostKeyChecking=no ${env.WORKSPACE}/${env.ARTIFACT_NAME}.tar.gz ubuntu@${PREPROD_IP}:/home/ubuntu/.tmp/builds/${env.SERVICE_NAME}"
              sh "ssh -o StrictHostKeyChecking=no ubuntu@${PREPROD_IP} 'bash -s' < ./deploy.sh ${env.SERVICE_NAME} ${env.ARTIFACT_NAME}"
            }
          }
        }
      }
    }
  }
  post {
    always {
      cleanWs()
    }
    // Triggering Mails
    success {  
      script {
        if (env.BRANCH_NAME == 'development') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";
        }
        if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'staging' || env.BRANCH_NAME == 'preprod') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Success</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "SUCCESS CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";
        }
      }
    }  
    
    failure {  
      script {
        if (env.BRANCH_NAME == 'development') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";  
        }
        if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'staging' || env.BRANCH_NAME == 'preprod') {
          mail body: "<b>Jenkins Build Status</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL build: ${env.BUILD_URL} <br><h3>Status: Error</h3><br>", charset: 'UTF-8', from: 'jenkins@mathfactlabs.com', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "${env.EMAIL_TO_SEND_CC_DEV}";  
        }  
      }  
    }
  }
}
