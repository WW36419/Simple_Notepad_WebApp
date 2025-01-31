export const config = {
    port: process.env.PORT || 3100,
    JwtSecret: "NGTds8mhG5aZ",
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://WW36419:NCfNjY7BScehz1kp@cluster0.vvckt.mongodb.net/simple_notepad?retryWrites=true&w=majority&appName=Cluster0'
};