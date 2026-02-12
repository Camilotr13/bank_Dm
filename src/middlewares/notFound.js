export const notFound = (req, res) => {
   res.status(404).json({
      message: "Error searching or invalid characters"
   });
};
