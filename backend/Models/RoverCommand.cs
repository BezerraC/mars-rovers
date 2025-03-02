public class RoverCommand
{
    public Rover Rover { get; set; }
    public Plateau Plateau { get; set; }
    public string Commands { get; set; }

    public RoverCommand(Rover rover, Plateau plateau, string commands)
    {
        Rover = rover;
        Plateau = plateau;
        Commands = commands;
    }
}