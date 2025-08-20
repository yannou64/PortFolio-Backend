export default function authorizedRoles(...allowedRoles){
    return (req, res, next) => {

        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "User not authentificated" });
        }

        const userRole = req.user.role;

        if(!allowedRoles.includes(userRole)) {
            return res.status(403).json({message: "Not allowed to access"});
        }

        next();
    }
}