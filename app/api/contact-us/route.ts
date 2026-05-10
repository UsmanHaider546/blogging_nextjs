
export async function POST(request:any) {
  return new Response(JSON.stringify({ message: 'Form Submitted, We will contact you soon.' }), { status: 200 });
//   const forwardedFor = request.headers.get('x-forwarded-for');
//   const ipaddress = forwardedFor ? forwardedFor.split(',')[0] : request.socket.remoteAddress;
//   const { name, email, title, Description } = await request.json();
//   const pending = await SupportPendingCheck(ipaddress);
//   if (pending === true) {
//     const all = {
//     "errors": [
//       {
//         "field": "Pending",
//         "message": "You have a pending support request. Please wait for it to be resolved before submitting a new one."
//       }
//     ]
  
//     }
//     return new Response(JSON.stringify(all), { status: 400 })
//   };
    
  
//   const requestPost = {
//     "data": {
//       name,
//       email,
//       title,
//       Description,
//       ipaddress
//     }
//   };

//   // Validate form data
//   let validation = await validateData({ name, email, title, Description });

//   // If validation fails, return errors
//   if (!validation.isValid) {
//     return new Response(JSON.stringify({ errors: validation.messages }), { status: 400 });
//   }

//   // Proceed with form submission if validation passes
//   const supportresponse = await PostSupportForm(requestPost);

//   if (supportresponse === true) {
//     return new Response(JSON.stringify({ message: 'Form Submitted, We will contact you soon.' }), { status: 200 });
//   }

//   return new Response(JSON.stringify({ message: 'An error occurred while submitting the form.' }), { status: 500 });
// }

// async function validateData({ name, email, title, Description }) {
//   let errors = [];

//   // Validate 'name': non-empty and must be a string
//   if (!name || name.length<3 || typeof name !== 'string' || name.trim() === '') {
//     errors.push({ field: 'name', message: 'Name is required and must be a non-empty string.' });
//   }

//   // Validate 'email': must be a valid email format
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
//     errors.push({ field: 'email', message: 'Please provide a valid email address.' });
//   }

//   // Validate 'title': non-empty string
//   if (!title|| title.length<3 || typeof title !== 'string' || title.trim() === '') {
//     errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
//   }

//   // Validate 'Description': non-empty string and at least 40 characters long
//   if (!Description || typeof Description !== 'string' || Description.trim() === '' || Description.length < 40) {
//     errors.push({ field: 'Description', message: 'Message is required, must be at least 40 characters long, and should be clear and descriptive.' });
//   }

//   // Now, if Description passed basic checks, validate its sense using GemniResponse
//   if (errors.length === 0) {
//     const prompt = `This is my contact-us page, and I want to check whether this message makes sense or if it's a dummy message. If it makes sense, send 'true'. If it's too promotional,insulty,rudy or you think it's a dummy message, send 'false'. Even if the message contains spelling mistakes or shorthand, consider it 'true'.remember that you give answer in just true or false statement and no any other word is accepted(just true or false and no any other word). Here is the message:  "${Description}"`;

//     const sense = await GemniResponse(prompt);

//     // If GemniResponse returns 'false', add a validation error for the description
//     if (sense.includes('false')) {
//       errors.push({ field: 'Description', message: 'The message content does not seem to make sense. Please provide a clear and meaningful description.' });
//     }
//   }

//   // Return the result of the validation
//   if (errors.length > 0) {
//     return { isValid: false, messages: errors };
//   }

//   return { isValid: true, message: 'Validation successful!' };
}
