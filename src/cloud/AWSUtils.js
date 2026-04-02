/**
 * AWS Utility Simulation for University Project
 * This module simulates interactions with AWS services: S3, RDS, Lambda, and CloudWatch.
 */

export const simulateS3Upload = async (file) => {
  console.log(`[AWS S3] Uploading file to bucket: lys-service-images...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = `https://s3.amazonaws.com/lys-service-images/${file.name || 'service-' + Date.now() + '.jpg'}`;
      console.log(`[AWS S3] Upload successful. Object URL: ${mockUrl}`);
      resolve(mockUrl);
    }, 1500);
  });
};

export const simulateRDSInsert = async (serviceData) => {
  console.log(`[AWS RDS] Inserting record into table 'services' in RDS instance: lys-db-prod...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[AWS RDS] Transaction committed successfully.`);
      resolve({ id: Math.floor(Math.random() * 1000000), ...serviceData });
    }, 1000);
  });
};

export const simulateLambdaTrigger = async (serviceId) => {
  console.log(`[AWS Lambda] Invoking function: 'processNewListing' for Service ID: ${serviceId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[AWS Lambda] Function executed successfully. Status: 200 OK`);
      resolve(true);
    }, 800);
  });
};

export const simulateCloudWatchLog = (message, level = 'INFO') => {
  const timestamp = new Date().toISOString();
  console.log(`[AWS CloudWatch] ${timestamp} [${level}] ${message}`);
};
