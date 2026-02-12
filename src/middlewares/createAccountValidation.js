export const createAccountValidation = (req, res, next) => {

   const { name, balance } = req.body;

   if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
         message: "Body is required"
      });
   }

   if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
         message: "Invalid or missing name"
      });
   }

   if (balance === undefined) {
      return res.status(400).json({
         message: "Balance is required"
      });
   }

   
   if (typeof balance !== "number") {
      return res.status(400).json({
         message: "Balance must be a number"
      });
   }

   if (balance < 0) {
      return res.status(400).json({
         message: "Balance must be greater or equal to 0"
      });
   }

   next();
};
