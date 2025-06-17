# Google Form Integration Setup Guide

This guide will help you set up a Google Form to collect submissions from your Aerospace RAG landing page.

## Step 1: Create a New Google Form

1. Go to [Google Forms](https://forms.google.com) and create a new form
2. Click the "+" button to create a blank form

## Step 2: Set Up Form Fields

Create the following fields in your Google Form:

1. **Full Name** (Short answer)
2. **Company** (Short answer)
3. **Email** (Short answer)
4. **Phone Number** (Short answer)
5. **Message** (Paragraph)
6. **Form Type** (Multiple choice with options: "waitlist", "demo", "General inquiry")

## Step 3: Get the Form Field IDs

1. Click the three dots in the top right corner of your form and select "Get pre-filled link"
2. Fill in each field with a dummy value (e.g., "test")
3. Click "Get Link"
4. In the URL that appears, you'll see parameters like `entry.123456789=test`
5. The numbers after "entry." are the field IDs you need for your JavaScript code

## Step 4: Update the JavaScript Code

1. Open `/js/main.js`
2. Find the Google Form submission section
3. Replace the placeholder entry IDs with your actual form field IDs:

```javascript
googleFormData.append('entry.123456789', formDataObj.name); // Replace 123456789 with your Name field ID
googleFormData.append('entry.234567890', formDataObj.company); // Replace 234567890 with your Company field ID
googleFormData.append('entry.345678901', formDataObj.email); // Replace 345678901 with your Email field ID
// And so on...
```

4. Replace the Google Form URL with your actual form URL:

```javascript
const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
```

To find your form ID, look at the URL of your Google Form. It will look like:
`https://docs.google.com/forms/d/e/1FAIpQLSeSBPQ2hFzz9MnGfvFRRlG5h64QzXQFYjGpUMK4dWo_dXzR_Q/viewform`

The part `1FAIpQLSeSBPQ2hFzz9MnGfvFRRlG5h64QzXQFYjGpUMK4dWo_dXzR_Q` is your form ID.

## Step 5: Configure Google Form Settings

1. Go to your Google Form settings (click the gear icon)
2. Under the "Responses" tab, click "Create Spreadsheet" to create a Google Sheet that will collect all submissions
3. Make sure "Collect email addresses" is turned OFF (we're collecting this in a form field instead)
4. Under "Presentation" settings, turn OFF the confirmation page if you don't want users to see it

## Step 6: Testing Your Form

1. Test your form submission on your local development server
2. Check that the data appears in your Google Sheet
3. Verify all form fields are being transmitted correctly

## Troubleshooting

- If submissions aren't appearing in your Google Sheet, check that the field IDs in your JavaScript match the actual IDs in your form
- Make sure your Google Form is set to accept responses
- The iframe method helps bypass CORS restrictions, but won't provide feedback if submission fails. Consider implementing error handling for a production environment.

## Security Considerations

- Google Forms submissions sent this way will be visible in the network traffic
- For collecting sensitive information, consider a more secure form handling solution
- This method is best for collecting basic lead information
