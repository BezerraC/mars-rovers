using System.ComponentModel;

public class RoverService
{
    public Rover MoveRover(Rover rover, Plateau plateau, string commands)
    {
        foreach (var command in commands)
        {
            switch (command)
            {
                case 'L': rover.Direction = TurnLeft(rover.Direction); break;
                case 'R': rover.Direction = TurnRight(rover.Direction); break;
                case 'M': MoveForward(rover, plateau); break;
            }
        }
        return rover;
    }

    private char TurnLeft(char direction)
    {
        return direction switch
        {
            'N' => 'W',
            'W' => 'S',
            'S' => 'E',
            'E' => 'N',
            _ => direction
        };
    }

    private char TurnRight(char direction)
    {
        return direction switch
        {
            'N' => 'E',
            'E' => 'S',
            'S' => 'W',
            'W' => 'N',
            _ => direction
        };
    }

    private void MoveForward(Rover rover, Plateau plateau)
    {
        switch (rover.Direction)
        {
            case 'N':
                if (rover.Y < plateau.Height)
                {
                    rover.Y++;
                }
                break;
            case 'E':
                if (rover.X < plateau.Width)
                {
                    rover.X++;
                }
                break;
            case 'S':
                if (rover.Y > 0)
                {
                    rover.Y--;
                }
                break;
            case 'W':
                if (rover.X > 0)
                {
                    rover.X--;
                }
                break;
        }
    }
}