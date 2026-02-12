export const validateId = (req, res, next) => {

   const { id } = req.params;

   if (isNaN(id)) {
      return res.status(400).json({
         message: "Error searching or invalid characters"
      });
   }

   next();
};
