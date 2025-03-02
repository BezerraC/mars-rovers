public class RoverService
{
    private List<(int X, int Y)> _occupiedPositions = new List<(int X, int Y)>();

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
        int newX = rover.X;
        int newY = rover.Y;

        switch (rover.Direction)
        {
            case 'N':
                newY = rover.Y + 1;
                break;
            case 'E':
                newX = rover.X + 1;
                break;
            case 'S':
                newY = rover.Y - 1;
                break;
            case 'W':
                newX = rover.X - 1;
                break;
        }

        if (newX < 0 || newX > plateau.Width || newY < 0 || newY > plateau.Height)
        {
            throw new InvalidOperationException("Movimento inválido: Rover sairia do planalto.");
        }

        if (_occupiedPositions.Contains((newX, newY)))
        {
            throw new InvalidOperationException("Movimento inválido: Posição já ocupada por outra sonda.");
        }

        _occupiedPositions.Remove((rover.X, rover.Y));
        rover.X = newX;
        rover.Y = newY;
        _occupiedPositions.Add((rover.X, rover.Y));
    }
}